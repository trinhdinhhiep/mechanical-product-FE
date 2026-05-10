import { Button, Card } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined } from '@ant-design/icons'
import type { Block } from '@/types/article'
import { ParagraphBlockEditor } from './ParagraphBlockEditor'
import { HeadingBlockEditor } from './HeadingBlockEditor'
import { ImageBlockEditor } from './ImageBlockEditor'
import { ImageGalleryBlockEditor } from './ImageGalleryBlockEditor'
import { VideoBlockEditor } from './VideoBlockEditor'
import { TableOfContentsBlockEditor } from './TableOfContentsBlockEditor'
import { TableBlockEditor } from './TableBlockEditor'
import { ListBlockEditor } from './ListBlockEditor'
import { CalloutBlockEditor } from './CalloutBlockEditor'

const BLOCK_LABELS: Record<Block['type'], string> = {
  paragraph: '📝 Paragraph',
  heading: '📌 Heading',
  image: '🖼️ Image',
  image_gallery: '🖼️ Image Gallery',
  video: '🎬 Video',
  table_of_contents: '📋 Table of Contents',
  table: '📊 Table',
  list: '📃 List',
  callout: '💡 Callout',
  divider: '➖ Divider',
}

interface Props {
  block: Block
  index: number
  total: number
  allBlocks: Block[] // thêm
  onChange: (b: Block) => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

export const BlockItem = ({ index, block, total, allBlocks, onChange, onRemove, onMoveUp, onMoveDown }: Props) => {
  const renderEditor = () => {
    switch (block.type) {
      case 'paragraph':
        return <ParagraphBlockEditor block={block} onChange={onChange} />
      case 'heading':
        return <HeadingBlockEditor block={block} onChange={onChange} />
      case 'image':
        return <ImageBlockEditor block={block} onChange={onChange} />
      case 'image_gallery':
        return <ImageGalleryBlockEditor block={block} onChange={onChange} />
      case 'video':
        return <VideoBlockEditor block={block} onChange={onChange} />
      case 'table_of_contents':
        return <TableOfContentsBlockEditor block={block} onChange={onChange} allBlocks={allBlocks} />
      case 'table':
        return <TableBlockEditor block={block} onChange={onChange} />
      case 'list':
        return <ListBlockEditor block={block} onChange={onChange} />
      case 'callout':
        return <CalloutBlockEditor block={block} onChange={onChange} />
      case 'divider':
        return <div className='border-t border-dashed border-gray-300 my-2' />
      default:
        return null
    }
  }

  return (
    <Card
      size='small'
      title={
        <span className='text-xs font-medium text-gray-500'>
          #{index + 1} {BLOCK_LABELS[block.type]}
        </span>
      }
      extra={
        <div className='flex items-center gap-1'>
          <Button size='small' icon={<ArrowUpOutlined />} disabled={index === 0} onClick={onMoveUp} />
          <Button size='small' icon={<ArrowDownOutlined />} disabled={index === total - 1} onClick={onMoveDown} />
          <Button size='small' danger icon={<DeleteOutlined />} onClick={onRemove} />
        </div>
      }
    >
      {renderEditor()}
    </Card>
  )
}
