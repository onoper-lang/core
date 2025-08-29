import { GroupCard } from "./components/organisms/GroupCard";
import { Root } from "./components/organisms/Root";
import { SimpleCard } from "./components/organisms/SimpleCard";

export const ComponentRegistry = {
    GroupCard: (props: any) => GroupCard(props),
    Root: (props: any) => Root(props),
    SimpleCard: (props: any) => SimpleCard(props)
}