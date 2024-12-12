import { ButtonProps } from "./types";

export default function Button({ buttonName, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
                text-white
                bg-gray-800
                hover:bg-gray-600
                duration-500
                font-medium
                py-2
                px-5
                rounded-full
            "
        >
            {buttonName}
        </button>
    );
};