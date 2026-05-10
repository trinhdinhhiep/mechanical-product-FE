import { Button, Input } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import type { TableBlock } from '@/types/article'

interface Props {
  block: TableBlock
  onChange: (b: TableBlock) => void
}

export const TableBlockEditor = ({ block, onChange }: Props) => {
  const { caption, columns, rows } = block.data

  const updateCol = (i: number, val: string) => {
    const next = [...columns]
    next[i] = val
    onChange({ ...block, data: { ...block.data, columns: next } })
  }
  const addCol = () =>
    onChange({ ...block, data: { ...block.data, columns: [...columns, ''], rows: rows.map((r) => [...r, '']) } })
  const removeCol = (i: number) =>
    onChange({
      ...block,
      data: {
        ...block.data,
        columns: columns.filter((_, ci) => ci !== i),
        rows: rows.map((r) => r.filter((_, ci) => ci !== i)),
      },
    })

  const updateCell = (ri: number, ci: number, val: string) => {
    const next = rows.map((r) => [...r])
    next[ri][ci] = val
    onChange({ ...block, data: { ...block.data, rows: next } })
  }
  const addRow = () => onChange({ ...block, data: { ...block.data, rows: [...rows, columns.map(() => '')] } })
  const removeRow = (i: number) =>
    onChange({ ...block, data: { ...block.data, rows: rows.filter((_, ri) => ri !== i) } })

  return (
    <div className='space-y-3 overflow-x-auto'>
      <Input
        placeholder='Caption (tuỳ chọn)'
        value={caption}
        onChange={(e) => onChange({ ...block, data: { ...block.data, caption: e.target.value } })}
      />
      <table className='w-full text-sm border-collapse'>
        <thead>
          <tr>
            {columns.map((col, ci) => (
              <th key={ci} className='border border-gray-200 p-1 bg-gray-50'>
                <div className='flex gap-1'>
                  <Input size='small' value={col} onChange={(e) => updateCol(ci, e.target.value)} />
                  <Button size='small' danger icon={<DeleteOutlined />} onClick={() => removeCol(ci)} />
                </div>
              </th>
            ))}
            <th>
              <Button size='small' icon={<PlusOutlined />} onClick={addCol} />
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className='border border-gray-200 p-1'>
                  <Input size='small' value={cell} onChange={(e) => updateCell(ri, ci, e.target.value)} />
                </td>
              ))}
              <td>
                <Button size='small' danger icon={<DeleteOutlined />} onClick={() => removeRow(ri)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button size='small' icon={<PlusOutlined />} onClick={addRow}>
        Thêm hàng
      </Button>
    </div>
  )
}
