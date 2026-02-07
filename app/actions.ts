'use server'

import { sendMessage, getUserByEmail } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return { error: "Please enter both email and password." };
        }

        const user = await getUserByEmail(email);

        // If no user found or password doesn't match
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return { error: "Invalid credentials." };
        }

        // Create Session
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        const session = await encrypt({ user: { id: user.id, email: user.email, role: user.role, name: user.name }, expires });

        (await cookies()).set("session", session, { expires, httpOnly: true });

        // Redirect based on role
        if (user.role === 'client') {
            redirect('/dashboard/client');
        } else if (user.role === 'developer') {
            redirect('/dashboard/developer');
        } else {
            redirect('/'); // Fallback
        }
    } catch (error: any) {
        console.error("Login Error:", error);
        if (error.message === "NEXT_REDIRECT") throw error; // Re-throw redirect
        return { error: "Login failed: " + error.message };
    }
}

export async function logout() {
    (await cookies()).delete("session");
    redirect("/login");
}

export async function submitMessage(content: string, senderName: string, senderRole: 'client' | 'developer') {
    if (!content || !content.trim()) return;
    try {
        await sendMessage(content, senderName, senderRole);
        revalidatePath('/dashboard/client');
        revalidatePath('/dashboard/developer');
        return { success: true };
    } catch (e) {
        console.error("Failed to send message", e);
        return { success: false };
    }
}

// --- Developer Dashboard Actions ---

import { updateTaskStatus, updateProjectHours } from "@/lib/db/queries";

export async function updateTaskStatusAction(taskId: number, status: string) {
    try {
        await updateTaskStatus(taskId, status);
        revalidatePath('/dashboard/developer');
        revalidatePath('/dashboard/client'); // Client sees progress too
        return { success: true };
    } catch (e) {
        console.error("Failed to update task", e);
        return { success: false };
    }
}

export async function logHoursAction(projectId: number, hours: number) {
    try {
        await updateProjectHours(projectId, hours);
        revalidatePath('/dashboard/developer');
        return { success: true };
    } catch (e) {
        console.error("Failed to log hours", e);
        return { success: false };
    }
}
import { createClientRequest } from "@/lib/db/queries";

export async function submitOrderRequest(data: any) {
    try {
        await createClientRequest(data);
        return { success: true };
    } catch (e) {
        console.error("Failed to submit order request", e);
        return { success: false };
    }
}
import { createClientProfile, assignDeveloper } from "@/lib/db/queries";

export async function createClientAccount(data: any) {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        await createClientProfile({ ...data, password: hashedPassword });
        // TODO: Email the client their credentials (mocked for now)
        console.log(`Email sent to ${data.email} with password: ${data.password}`);
        return { success: true };
    } catch (e) {
        console.error("Failed to create client account", e);
        return { success: false };
    }
}

export async function assignDeveloperAction(clientId: number, developerId: number) {
    try {
        await assignDeveloper(clientId, developerId);
        // TODO: Send notifications
        return { success: true };
    } catch (e) {
        console.error("Failed to assign developer", e);
        return { success: false };
    }
}

// --- Razorpay Payment Actions ---
import Razorpay from 'razorpay';

export async function createRazorpayOrder(amount: number) {
    try {
        const razorpay = new Razorpay({
            key_id: "rzp_test_SDB1saOMoT7FUJ",
            key_secret: "hGrjn7AJa1Y6R7E2lGlCV4bg",
        });

        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        };

        const order = await razorpay.orders.create(options);
        return JSON.parse(JSON.stringify(order)); // Serialization for client
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        throw new Error("Failed to create Razorpay order");
    }
}
