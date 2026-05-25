import { Bolt } from "lucide-react";

export default function Loader() {
    return(
        <div className="fixed w-screen h-screen flex flex-col top-0 left-0 items-center justify-center">
            <Bolt className="size-30 animate-spin text-primary"/>
        </div>
    );
}