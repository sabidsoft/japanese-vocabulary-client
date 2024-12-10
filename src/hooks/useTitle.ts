import { useEffect } from "react";

const useTitle = (title: string): void => {
    useEffect(() => {
        if (title === "Home") {
            document.title = `Japanese Vocabulary`;
        } else {
            document.title = `${title} | Japanese Vocabulary`;
        }
    }, [title]);
};

export default useTitle;