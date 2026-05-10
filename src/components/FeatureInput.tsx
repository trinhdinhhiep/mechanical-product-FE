import { useState } from 'react'
import { Button, Input } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

// ── Config màu ────────────────────────────────────────────────────
const COLOR_OPTIONS = [
  {
    label: 'Đỏ',
    bg: 'bg-red-100',
    border: 'border-red-600',
    iconColor: 'text-red-700',
    preview: '#fee2e2',
    dot: '#dc2626',
  },
  {
    label: 'Cam',
    bg: 'bg-orange-100',
    border: 'border-orange-600',
    iconColor: 'text-orange-700',
    preview: '#ffedd5',
    dot: '#ea580c',
  },
  {
    label: 'Vàng',
    bg: 'bg-yellow-100',
    border: 'border-yellow-500',
    iconColor: 'text-yellow-700',
    preview: '#fef9c3',
    dot: '#ca8a04',
  },
  {
    label: 'Xanh lá',
    bg: 'bg-green-100',
    border: 'border-green-600',
    iconColor: 'text-green-700',
    preview: '#dcfce7',
    dot: '#16a34a',
  },
  {
    label: 'Xanh dương',
    bg: 'bg-blue-100',
    border: 'border-blue-700',
    iconColor: 'text-blue-800',
    preview: '#dbeafe',
    dot: '#1d4ed8',
  },
  {
    label: 'Tím',
    bg: 'bg-purple-100',
    border: 'border-purple-600',
    iconColor: 'text-purple-700',
    preview: '#f3e8ff',
    dot: '#9333ea',
  },
  {
    label: 'Hồng',
    bg: 'bg-pink-100',
    border: 'border-pink-600',
    iconColor: 'text-pink-700',
    preview: '#fce7f3',
    dot: '#db2777',
  },
  {
    label: 'Xám',
    bg: 'bg-gray-100',
    border: 'border-gray-500',
    iconColor: 'text-gray-700',
    preview: '#f3f4f6',
    dot: '#6b7280',
  },
]

// ── Emoji có sẵn ─────────────────────────────────────────────────
const EMOJI_LIST = [
  '🔥',
  '💧',
  '⚡',
  '🛡️',
  '🎯',
  '💡',
  '♻️',
  '🔧',
  '🏆',
  '✅',
  '🚀',
  '🌟',
  '💎',
  '🔒',
  '🌿',
  '🎖️',
  '📦',
  '🤝',
  '⚙️',
  '🏅',
  '🌍',
  '💪',
  '🧪',
  '📋',
  '🔑',
  '🎁',
  '📊',
  '🛠️',
  '🌈',
  '❤️',
]

// ── Types ─────────────────────────────────────────────────────────
export interface FeatureItem {
  icon: string
  title: string
  bg: string
  border: string
  iconColor: string
}

interface FeatureRow {
  id: number
  icon: string
  title: string
  colorIndex: number
  showEmojiPicker: boolean
}

interface FeatureInputProps {
  value?: FeatureItem[]
  onChange?: (features: FeatureItem[]) => void
}

// ── Component ─────────────────────────────────────────────────────
const FeatureInput = ({ onChange }: FeatureInputProps) => {
  const [rows, setRows] = useState<FeatureRow[]>([
    { id: Date.now(), icon: '🎯', title: '', colorIndex: 3, showEmojiPicker: false },
  ])

  const emit = (updated: FeatureRow[]) => {
    onChange?.(
      updated.map((r) => {
        const color = COLOR_OPTIONS[r.colorIndex]
        return { icon: r.icon, title: r.title, bg: color.bg, border: color.border, iconColor: color.iconColor }
      }),
    )
  }

  const update = (id: number, patch: Partial<FeatureRow>) => {
    const updated = rows.map((r) => (r.id === id ? { ...r, ...patch } : r))
    setRows(updated)
    emit(updated)
  }

  const addRow = () => {
    const updated = [
      ...rows,
      { id: Date.now(), icon: '🎯', title: '', colorIndex: rows.length % COLOR_OPTIONS.length, showEmojiPicker: false },
    ]
    setRows(updated)
    emit(updated)
  }

  const removeRow = (id: number) => {
    const updated = rows.filter((r) => r.id !== id)
    setRows(updated)
    emit(updated)
  }

  return (
    <div className='flex flex-col gap-3'>
      {rows.map((row) => (
        <div key={row.id} className='flex items-start gap-2 p-3 rounded-lg border border-gray-200 bg-gray-50'>
          {/* Emoji picker */}
          <div className='relative'>
            <button
              type='button'
              className='w-10 h-10 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 flex items-center justify-center text-xl bg-white'
              onClick={() => update(row.id, { showEmojiPicker: !row.showEmojiPicker })}
            >
              {row.icon}
            </button>

            {row.showEmojiPicker && (
              <div className='absolute top-12 left-0 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-3 w-56'>
                <div className='grid grid-cols-6 gap-1'>
                  {EMOJI_LIST.map((emoji) => (
                    <button
                      key={emoji}
                      type='button'
                      className='w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center text-lg'
                      onClick={() => update(row.id, { icon: emoji, showEmojiPicker: false })}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <Input
            value={row.title}
            placeholder='Tên tính năng...'
            className='flex-1'
            onChange={(e) => update(row.id, { title: e.target.value })}
          />

          {/* Chọn màu */}
          <div className='flex items-center gap-1 flex-wrap max-w-[160px]'>
            {COLOR_OPTIONS.map((color, i) => (
              <button
                key={i}
                type='button'
                title={color.label}
                className='w-6 h-6 rounded-full border-2 transition-transform hover:scale-110'
                style={{
                  backgroundColor: color.preview,
                  borderColor: row.colorIndex === i ? color.dot : 'transparent',
                  outline: row.colorIndex === i ? `2px solid ${color.dot}` : 'none',
                  outlineOffset: '1px',
                }}
                onClick={() => update(row.id, { colorIndex: i })}
              />
            ))}
          </div>

          {/* Preview */}
          <div
            className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-xl flex-shrink-0 ${COLOR_OPTIONS[row.colorIndex].bg} ${COLOR_OPTIONS[row.colorIndex].border}`}
          >
            {row.icon}
          </div>

          {/* Xoá */}
          {rows.length > 1 && (
            <button type='button' className='text-red-400 hover:text-red-600 mt-2' onClick={() => removeRow(row.id)}>
              <DeleteOutlined />
            </button>
          )}
        </div>
      ))}

      <Button type='dashed' icon={<PlusOutlined />} onClick={addRow} className='w-full'>
        Thêm tính năng
      </Button>
    </div>
  )
}

export default FeatureInput
