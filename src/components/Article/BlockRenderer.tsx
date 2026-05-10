import type { Block } from '@/types/article'
import {
  ParagraphBlockComponent,
  HeadingBlockComponent,
  ImageBlockComponent,
  ImageGalleryBlockComponent,
  VideoBlockComponent,
  TableOfContentsBlockComponent,
  TableBlockComponent,
  ListBlockComponent,
  CalloutBlockComponent,
  DividerBlockComponent,
} from './Blocks'

interface Props {
  blocks: Block[]
}

export default function BlockRenderer({ blocks }: Props) {
  return (
    <div className='space-y-1'>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return <ParagraphBlockComponent key={index} data={block.data} />
          case 'heading':
            return <HeadingBlockComponent key={index} data={block.data} />
          case 'image':
            return <ImageBlockComponent key={index} data={block.data} />
          case 'image_gallery':
            return <ImageGalleryBlockComponent key={index} data={block.data} />
          case 'video':
            return <VideoBlockComponent key={index} data={block.data} />
          case 'table_of_contents':
            return <TableOfContentsBlockComponent key={index} data={block.data} />
          case 'table':
            return <TableBlockComponent key={index} data={block.data} />
          case 'list':
            return <ListBlockComponent key={index} data={block.data} />
          case 'callout':
            return <CalloutBlockComponent key={index} data={block.data} />
          case 'divider':
            return <DividerBlockComponent key={index} />
          default:
            // TypeScript exhaustive check — sẽ báo lỗi nếu thêm type mới mà chưa handle
            // eslint-disable-next-line no-console
            console.warn('Unknown block type:', (block as Block).type)
            return null
        }
      })}
    </div>
  )
}
