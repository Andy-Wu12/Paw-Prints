import { ImageList } from "./ImageList";

interface SectionedImageListProps {
  sectionName: string,
  imageURLs: string[],
  headerClass?: string,
}

export default function SectionedImageList(props: SectionedImageListProps): React.ReactElement {
  return (
    <>
      <h2 className={props.headerClass}> {props.sectionName} </h2> <br/>
      <ImageList images={props.imageURLs} desiredLength={props.imageURLs.length} />
    </>
  )
}