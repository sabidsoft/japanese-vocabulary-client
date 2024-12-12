import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

export default function Tutorials() {
    const navigate = useNavigate();

    // Array of tutorial data
    const tutorials = [
        {
            id: 1,
            title: "Japani vasa sikkha",
            youtubeUrl: "https://www.youtube.com/embed/x0UnOubeU9w?si=XFFW8N7cUUKgk8Yn",
        },
        {
            id: 2,
            title: "100 Informal Japanese Phrases for Beginner",
            youtubeUrl: "https://www.youtube.com/embed/ogqeb9TLO8A?si=avLbLVymNO-v4zck",
        },
        {
            id: 3,
            title: "200 Japanese Conversation Phrases for Beginners",
            youtubeUrl: "https://www.youtube.com/embed/YEAje1C6tBU?si=GWLIg8D5CL55ZaAP",
        },
        {
            id: 4,
            title: "Learn 120 Essential JAPANESE Nouns for Beginners",
            youtubeUrl: "https://www.youtube.com/embed/PmBxK3MwWug?si=GmbQ-deaQpgfjVFQ",
        },
        {
            id: 5,
            title: "Japanese Greetings In Bangla",
            youtubeUrl: "https://www.youtube.com/embed/g-TMgJzYGB0?si=naEkidBS5yF7LPd4",
        },
        {
            id: 6,
            title: "How to Learn Japanese Language Faster",
            youtubeUrl: "https://www.youtube.com/embed/gkVfTjkfV-c?si=ukz17Ck8IVE0vWNU",
        },
        {
            id: 7,
            title: "Japanese Language Vocabulary",
            youtubeUrl: "https://www.youtube.com/embed/8ZWacm4ilk4?si=nyMjNvrcy25KynIF",
        },
        {
            id: 8,
            title: "Slow & Easy Japanese Conversation Practice",
            youtubeUrl: "https://www.youtube.com/embed/LehKoS7-56M?si=dEcLVpJGiTdO9VkQ",
        },
        {
            id: 9,
            title: "100 Informal Japanese Phrases for Beginner",
            youtubeUrl: "https://www.youtube.com/embed/ogqeb9TLO8A?si=6PBcGi1rNa2M1jSD",
        },
    ];

    return (
        <>
            <div className="mt-8 px-4 w-[100%] lg:w-[80%] mx-auto">
                <h1 className="text-center text-4xl font-bold mb-6">Tutorials</h1>
                <p className="text-center text-gray-600 mb-8">
                    Explore our curated list of tutorials to enhance your learning experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tutorials.map((tutorial) => (
                        <div
                            key={tutorial.id}
                            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <iframe
                                className="w-full h-48"
                                src={tutorial.youtubeUrl}
                                title={tutorial.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800">{tutorial.title}</h2>
                                <button
                                    onClick={() => navigate("/lessons")}
                                    className="mt-4 text-blue-500 hover:underline"
                                >
                                    Go to Lessons
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-20">
                <Footer />
            </div>
        </>
    );
}
