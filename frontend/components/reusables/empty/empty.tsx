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
                <EmptyMedia variant="icon">
                    <Bookmark size={24} />
                </EmptyMedia>
                <EmptyTitle>No data</EmptyTitle>
                <EmptyDescription>No data found</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button text="Añadir Guardados" />
            </EmptyContent>
        </Empty>
    )
}

export default EmptyRightBar;