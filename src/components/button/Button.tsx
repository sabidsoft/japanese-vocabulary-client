import { ButtonProps } from "./types";

export default function Button({ buttonName, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
                text-white
                bg-[#333]
                hover:bg-[#000]
                duration-300
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