import { api } from "@/lib/axios";
import { DashboardData } from "../types";
import { fakeCall } from "@/lib/utils";

export const MOCK_DASHBOARD_DATA : DashboardData = {
    comparisons: [
      {
        title: "Message Count",
        youValue: "1,245",
        otherValue: "1,387",
        youLabel: "You",
        otherLabel: "Other",
      },
      {
        title: "Interest Level",
        youValue: "High",
        otherValue: "Medium",
        youLabel: "You",
        otherLabel: "Other",
      },
      {
        title: "Attachment Style",
        youValue: "Secure",
        otherValue: "Anxious",
        youLabel: "You",
        otherLabel: "Other",
      },
      {
        title: "Average Response Time",
        youValue: "5 min",
        otherValue: "12 min",
        youLabel: "You",
        otherLabel: "Other",
      },
      {
        title: "Compliment Count",
        youValue: "37",
        otherValue: "24",
        youLabel: "You",
        otherLabel: "Other",
      },
    ],
    topWords: {
        you: [
          { word: "love", count: 15 },
          { word: "happy", count: 12 },
          { word: "excited", count: 10 },
          { word: "chat", count: 8 },
          { word: "see", count: 7 },
        ],
        other: [
          { word: "miss", count: 14 },
          { word: "busy", count: 11 },
          { word: "talk", count: 9 },
          { word: "soon", count: 6 },
          { word: "later", count: 5 },
        ],
      },
    messagesPerMonth: {
      months: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      you: [78, 85, 102, 110, 125, 115, 90, 105, 118, 130, 145, 160],
      other: [92, 88, 95, 120, 132, 105, 88, 115, 125, 140, 138, 152],
    },
    redFlags: ["Long response times", "One-sided conversations", "Frequent topic avoidance"],
};



export async function sendFile(data: any) {
    return await api.post("/api/sendFile", data)
}

export async function getCache() {
    
}

export async function getConvById(_convId : string){
    // return await api.get(`/api/${_convId}`)
    return fakeCall(MOCK_DASHBOARD_DATA)
}