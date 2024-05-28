"use server"

import { generateAnalyticsData } from "./analytics.generator";

export const subscribersAnalytics = async () => {
    try {
        const subscribers = await generateAnalyticsData();
        return subscribers;
    } catch (err) {
        console.log(err);
    }
}