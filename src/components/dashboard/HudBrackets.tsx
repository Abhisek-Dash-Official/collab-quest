export default function HudBrackets({ colorClass }: { colorClass: string }) {
    return (
        <>
            <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${colorClass}`} />
            <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${colorClass}`} />
            <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${colorClass}`} />
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${colorClass}`} />
        </>
    );
}