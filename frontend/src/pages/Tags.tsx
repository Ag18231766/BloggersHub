import { TagRender } from "../components/TagsRender";
import { useGetTags } from "../hooks/GetTags";


export function Tags(){
    const {tags,message} = useGetTags();

    if(message.length > 0){
        return (
            <TagRender tags={[]}></TagRender>
        )
    }
    return (
        <div>
            <TagRender tags={tags}></TagRender>
        </div>
    )
}