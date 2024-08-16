// app/waitlist/page.js
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../firebaseConfig"; // Adjust path as needed
import { collection, addDoc } from "firebase/firestore";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default function WaitlistPage() {
  const { isSignedIn, user } = useUser();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignedIn) {
        const docRef = await addDoc(collection(db, "waitlist"), {
          email: user.primaryEmailAddress.emailAddress,
          joinedAt: new Date(),
        });
        setMessage("You've been added to the waitlist!");
      } else {
        const docRef = await addDoc(collection(db, "waitlist"), {
          email,
          joinedAt: new Date(),
        });
        setMessage("You've been added to the waitlist!");
      }
    } catch (error) {
      setMessage("Error adding you to the waitlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Join the QuickCard AI Waitlist</h1>
        <p className="text-center text-gray-600 mb-4">Be the first to know when we launch!</p>

        {message && <div className="text-center mb-4 text-green-600">{message}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {!isSignedIn && (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            {loading ? "Submitting..." : "Join Waitlist"}
          </button>
        </form>
      </div>
    </div>
  );
}
