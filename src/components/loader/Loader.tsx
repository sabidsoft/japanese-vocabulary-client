import { MoonLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="h-screen flex justify-center items-center">
            <MoonLoader color="#FE0016" size={24} />
        </div>
    );
}
