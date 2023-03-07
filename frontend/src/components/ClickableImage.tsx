type ClickableImageProps = {
  href: string,
  className?: string,
  altText: string,
}

export function ClickableImage({href, className, altText}: ClickableImageProps): React.ReactElement {
  return (
    <>
      <a href={href} target="_blank" rel="noreferrer">
        <img className={className} src={href} alt={altText} />
      </a>
    </>
  )
}