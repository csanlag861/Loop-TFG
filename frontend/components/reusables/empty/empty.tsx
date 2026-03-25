import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import Button from "@/components/reusables/button/Button"
import { Bookmark } from "@geist-ui/icons"

const EmptyRightBar = () => {

    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon" className="w-12 h-12 rounded-full border border-(--gris-08)! bg-(--bg-01)">
                    <Bookmark size={24} />
                </EmptyMedia>
                <EmptyTitle className="text-(--gris-01)">Aún no hay guardados</EmptyTitle>
                <EmptyDescription>Guarda publicaciones para verlas más tarde.</EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}

export default EmptyRightBar;