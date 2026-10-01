import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCheck,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Image as ImageIcon,
  MessageCircle,
  Paperclip,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Video,
  Building2,
  Bell,
  CheckCircle2,
} from 'lucide-react'

import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Card, CardBody } from '@/components/ui/Card'
import { PopoverMenu, type MenuItem } from '@/components/ui/PopoverMenu'
import { useAuth } from '@/context/AuthContext'
import { CLIENT_ROUTES, useProjectHref } from '@/pages/client/clientRoutes'

/* =============================================================================
 * Client Messages   (route: /app/client/messages)
 *
 * Fixes vs. the previous version:
 *  - Breadcrumb pointed at /app/client/dashboard (not a route -> sent people to
 *    the home page). It now goes to /app/client.
 *  - Project links use useProjectHref(), so they never land on "not found".
 *  - "New message", "..." and paperclip buttons now work.
 *  - Video call is clearly disabled instead of silently doing nothing.
 *  - Attachments open something: uploaded files open in a new tab, project
 *    documents open the Property Passport.
 * ============================================================================= */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type MessageSender = 'client' | 'contractor'

type Message = {
  id: number
  sender: MessageSender
  text: string
  time: string
  read?: boolean
  attachment?: {
    name: string
    type: 'document' | 'image'
    /** Object URL for files you just attached. */
    url?: string
  }
}

type Conversation = {
  id: string
  name: string
  role: string
  initials: string
  project: string
  projectId: string
  online: boolean
  unread: number
  lastMessage: string
  lastTime: string
  accent: string
  messages: Message[]
}

/* -------------------------------------------------------------------------- */
/* Mock conversations                                                         */
/* -------------------------------------------------------------------------- */

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-001',
    name: 'Build Team',
    role: 'Project Contractor',
    initials: 'BT',
    project: 'Lekki Residence',
    projectId: '1',
    online: true,
    unread: 2,
    lastMessage: 'The roofing evidence has been uploaded for your review.',
    lastTime: '10:42 PM',
    accent: 'from-blue-600 to-cyan-500',
    messages: [
      {
        id: 1,
        sender: 'contractor',
        text: 'Good evening. The roofing phase is progressing well and we have completed the main roof structure.',
        time: '8:31 PM',
        read: true,
      },
      {
        id: 2,
        sender: 'client',
        text: 'Great. Please make sure the supporting evidence is uploaded before the milestone is submitted.',
        time: '8:37 PM',
        read: true,
      },
      {
        id: 3,
        sender: 'contractor',
        text: 'Absolutely. We have uploaded the latest site photographs and inspection evidence.',
        time: '10:21 PM',
        read: true,
      },
      {
        id: 4,
        sender: 'contractor',
        text: 'The roofing evidence has been uploaded for your review.',
        time: '10:42 PM',
        read: false,
      },
    ],
  },
  {
    id: 'conv-002',
    name: 'Amina Yusuf',
    role: 'Project Manager',
    initials: 'AY',
    project: 'Lekki Residence',
    projectId: '1',
    online: true,
    unread: 0,
    lastMessage: 'I have added the inspection notes to the project.',
    lastTime: 'Yesterday',
    accent: 'from-violet-600 to-fuchsia-500',
    messages: [
      {
        id: 1,
        sender: 'contractor',
        text: 'I have completed the inspection notes for the latest site visit.',
        time: 'Yesterday',
        read: true,
      },
      {
        id: 2,
        sender: 'client',
        text: 'Thank you. I will review them together with the milestone evidence.',
        time: 'Yesterday',
        read: true,
      },
    ],
  },
  {
    id: 'conv-003',
    name: 'Kola Architects',
    role: 'Professional Expert',
    initials: 'KA',
    project: 'Lekki Residence',
    projectId: '1',
    online: false,
    unread: 0,
    lastMessage: 'The revised drawings are ready.',
    lastTime: 'Mon',
    accent: 'from-amber-500 to-orange-500',
    messages: [
      {
        id: 1,
        sender: 'contractor',
        text: 'The revised architectural drawings are now ready for review.',
        time: 'Mon',
        read: true,
        attachment: {
          name: 'Revised Architectural Drawings.pdf',
          type: 'document',
        },
      },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/* Small components                                                           */
/* -------------------------------------------------------------------------- */

function MessageAvatar({
  initials,
  accent,
  small = false,
}: {
  initials: string
  accent: string
  small?: boolean
}) {
  return (
    <div
      className={[
        'relative flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-bold text-white shadow-sm',
        accent,
        small ? 'h-10 w-10 text-[11px]' : 'h-12 w-12 text-xs',
      ].join(' ')}
    >
      {initials}
    </div>
  )
}

function AttachmentCard({
  attachment,
  mine,
}: {
  attachment: NonNullable<Message['attachment']>
  mine: boolean
}) {
  const className = [
    'mt-3 flex items-center gap-3 rounded-xl border p-3 transition',
    mine
      ? 'border-white/10 bg-white/5 hover:bg-white/10'
      : 'border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-white',
  ].join(' ')

  const body = (
    <>
      <div
        className={[
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
          mine ? 'bg-white/10 text-blue-300' : 'bg-white text-blue-600 shadow-sm',
        ].join(' ')}
      >
        {attachment.type === 'image' ? (
          <ImageIcon className="h-4 w-4" />
        ) : (
          <FileText className="h-4 w-4" />
        )}
      </div>

      <div className="min-w-0">
        <p
          className={[
            'truncate text-xs font-semibold',
            mine ? 'text-white' : 'text-slate-800',
          ].join(' ')}
        >
          {attachment.name}
        </p>
        <p
          className={[
            'mt-0.5 text-[10px]',
            mine ? 'text-white/50' : 'text-slate-400',
          ].join(' ')}
        >
          {attachment.url ? 'Open file' : 'Open in Property Passport'}
        </p>
      </div>
    </>
  )

  return attachment.url ? (
    <a
      href={attachment.url}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {body}
    </a>
  ) : (
    <Link to={CLIENT_ROUTES.passport} className={className}>
      {body}
    </Link>
  )
}

/* -------------------------------------------------------------------------- */
/* Conversation list                                                          */
/* -------------------------------------------------------------------------- */

function ConversationList({
  conversations,
  activeId,
  onSelect,
  search,
  onSearch,
  newMessageItems,
}: {
  conversations: Conversation[]
  activeId: string
  onSelect: (id: string) => void
  search: string
  onSearch: (value: string) => void
  newMessageItems: MenuItem[]
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-slate-200/80 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600">
              Communication
            </p>
            <h2 className="mt-1 text-lg font-bold tracking-tight text-[#0B1220]">
              Messages
            </h2>
          </div>

          <PopoverMenu
            label="New message"
            icon={Plus}
            items={newMessageItems}
            buttonClassName="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          />
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search conversations..."
            aria-label="Search conversations"
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {conversations.length === 0 ? (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
              <MessageCircle className="h-5 w-5 text-slate-400" />
            </div>
            <p className="font-semibold text-slate-800">No conversations found</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Try another search term.
            </p>
            <button
              type="button"
              onClick={() => onSearch('')}
              className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          conversations.map((conversation) => {
            const active = conversation.id === activeId

            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() => onSelect(conversation.id)}
                className={[
                  'group flex w-full items-start gap-3 rounded-2xl p-3 text-left transition',
                  active
                    ? 'bg-[#0B1220] text-white shadow-lg shadow-slate-900/10'
                    : 'text-slate-900 hover:bg-slate-50',
                ].join(' ')}
              >
                <div className="relative">
                  <MessageAvatar
                    initials={conversation.initials}
                    accent={conversation.accent}
                    small
                  />
                  {conversation.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={[
                        'truncate text-sm font-semibold',
                        active ? 'text-white' : 'text-slate-900',
                      ].join(' ')}
                    >
                      {conversation.name}
                    </p>
                    <span
                      className={[
                        'shrink-0 text-[10px]',
                        active ? 'text-white/50' : 'text-slate-400',
                      ].join(' ')}
                    >
                      {conversation.lastTime}
                    </span>
                  </div>

                  <p
                    className={[
                      'mt-0.5 truncate text-[11px]',
                      active ? 'text-white/55' : 'text-slate-500',
                    ].join(' ')}
                  >
                    {conversation.role}
                  </p>

                  <div className="mt-1.5 flex items-center gap-2">
                    <p
                      className={[
                        'min-w-0 flex-1 truncate text-xs',
                        active ? 'text-white/70' : 'text-slate-500',
                      ].join(' ')}
                    >
                      {conversation.lastMessage}
                    </p>

                    {conversation.unread > 0 && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Main page                                                                  */
/* -------------------------------------------------------------------------- */

export function MessagesPage() {
  const { user } = useAuth()
  const projectHref = useProjectHref()

  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS)
  const [activeId, setActiveId] = useState(INITIAL_CONVERSATIONS[0]?.id ?? '')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

  const composerRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeId),
    [activeId, conversations],
  )

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return conversations

    return conversations.filter(
      (conversation) =>
        conversation.name.toLowerCase().includes(query) ||
        conversation.role.toLowerCase().includes(query) ||
        conversation.project.toLowerCase().includes(query) ||
        conversation.lastMessage.toLowerCase().includes(query),
    )
  }, [conversations, search])

  const totalUnread = conversations.reduce((total, c) => total + c.unread, 0)

  function selectConversation(id: string, focusComposer = false) {
    setActiveId(id)
    setSearch('')

    setConversations((current) =>
      current.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    )

    if (focusComposer) {
      window.setTimeout(() => composerRef.current?.focus(), 0)
    }
  }

  function markAllRead() {
    setConversations((current) => current.map((c) => ({ ...c, unread: 0 })))
  }

  function appendMessage(
    text: string,
    attachment?: Message['attachment'],
  ) {
    if (!activeConversation) return

    const newMessage: Message = {
      id: Date.now(),
      sender: 'client',
      text,
      time: 'Just now',
      read: true,
      attachment,
    }

    setConversations((current) =>
      current.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              lastMessage: attachment ? `Attachment: ${attachment.name}` : text,
              lastTime: 'Just now',
              messages: [...c.messages, newMessage],
            }
          : c,
      ),
    )
  }

  function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmed = message.trim()
    if (!trimmed) return

    appendMessage(trimmed)
    setMessage('')
  }

  function handleAttach(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    appendMessage(message.trim() || `Shared ${file.name}`, {
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'document',
      url: URL.createObjectURL(file),
    })

    setMessage('')
    event.target.value = ''
  }

  const displayName = user?.fullName?.split(' ')[0] || 'Client'

  const newMessageItems: MenuItem[] = conversations.map((c) => ({
    label: `${c.name} · ${c.role}`,
    onClick: () => selectConversation(c.id, true),
  }))

  const conversationMenu: MenuItem[] = activeConversation
    ? [
        {
          label: 'View project',
          to: projectHref(activeConversation.projectId),
          icon: Building2,
        },
        {
          label: 'Review decisions',
          to: CLIENT_ROUTES.decisions,
          icon: ClipboardCheck,
        },
        {
          label: 'Project updates',
          to: CLIENT_ROUTES.updates,
          icon: Bell,
        },
        {
          label: 'Mark all as read',
          onClick: markAllRead,
          icon: CheckCircle2,
        },
      ]
    : []

  return (
    <DashboardLayout title="Messages">
      <div className="mx-auto w-full max-w-[1600px] space-y-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link
                to={CLIENT_ROUTES.overview}
                className="transition hover:text-blue-600"
              >
                Client Portal
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-slate-600">Messages</span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600">
              Secure communication
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-[#0B1220] sm:text-3xl">
              Project communication
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Communicate directly with the people responsible for your projects,
              while keeping project conversations connected to the Build OS record.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            <Link
              to={CLIENT_ROUTES.decisions}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <ClipboardCheck className="h-4 w-4" />
              Review decisions
            </Link>

            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-semibold text-slate-700">
                Secure project communication
              </span>
            </div>
          </div>
        </div>

        {/* Messenger */}
        <Card className="overflow-hidden border-slate-200/80 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.25)]">
          <CardBody className="p-0">
            <div className="grid h-[calc(100vh-280px)] min-h-[620px] grid-cols-1 lg:grid-cols-[330px_minmax(0,1fr)]">
              <aside className="min-h-0 border-b border-slate-200/80 bg-white lg:border-b-0 lg:border-r">
                <ConversationList
                  conversations={filteredConversations}
                  activeId={activeId}
                  onSelect={(id) => selectConversation(id)}
                  search={search}
                  onSearch={setSearch}
                  newMessageItems={newMessageItems}
                />
              </aside>

              {activeConversation ? (
                <section className="flex min-h-0 flex-col bg-[#F7F9FC]">
                  <header className="flex items-center justify-between border-b border-slate-200/80 bg-white px-4 py-4 sm:px-6">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative">
                        <MessageAvatar
                          initials={activeConversation.initials}
                          accent={activeConversation.accent}
                        />
                        {activeConversation.online && (
                          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-bold text-[#0B1220]">
                          {activeConversation.name}
                        </h2>
                        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                          <span>{activeConversation.role}</span>
                          <span className="h-1 w-1 rounded-full bg-slate-300" />
                          <span>{activeConversation.online ? 'Online' : 'Offline'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled
                        title="Video calls are coming soon"
                        aria-label="Video calls are coming soon"
                        className="hidden h-9 w-9 cursor-not-allowed items-center justify-center rounded-xl text-slate-300 sm:flex"
                      >
                        <Video className="h-4 w-4" />
                      </button>

                      <PopoverMenu
                        label="Conversation options"
                        items={conversationMenu}
                        buttonClassName="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
                      />
                    </div>
                  </header>

                  {/* Project context */}
                  <div className="border-b border-slate-200/80 bg-white px-4 py-3 sm:px-6">
                    <Link
                      to={projectHref(activeConversation.projectId)}
                      className="group flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2.5 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-600">
                            Project
                          </p>
                          <p className="truncate text-xs font-semibold text-slate-800">
                            {activeConversation.project}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-blue-400 transition group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                  {/* Messages */}
                  <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
                    <div className="mx-auto flex max-w-4xl flex-col gap-4">
                      <div className="mb-2 flex items-center justify-center">
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 shadow-sm">
                          Today
                        </span>
                      </div>

                      {activeConversation.messages.map((item) => {
                        const mine = item.sender === 'client'

                        return (
                          <div
                            key={item.id}
                            className={['flex', mine ? 'justify-end' : 'justify-start'].join(' ')}
                          >
                            <div
                              className={[
                                'flex max-w-[85%] items-end gap-2 sm:max-w-[70%]',
                                mine ? 'flex-row-reverse' : 'flex-row',
                              ].join(' ')}
                            >
                              {!mine && (
                                <MessageAvatar
                                  initials={activeConversation.initials}
                                  accent={activeConversation.accent}
                                  small
                                />
                              )}

                              <div>
                                <div
                                  className={[
                                    'rounded-2xl px-4 py-3 shadow-sm',
                                    mine
                                      ? 'rounded-br-md bg-[#0B1220] text-white'
                                      : 'rounded-bl-md border border-slate-200 bg-white text-slate-800',
                                  ].join(' ')}
                                >
                                  <p className="whitespace-pre-wrap text-sm leading-6">
                                    {item.text}
                                  </p>

                                  {item.attachment && (
                                    <AttachmentCard
                                      attachment={item.attachment}
                                      mine={mine}
                                    />
                                  )}
                                </div>

                                <div
                                  className={[
                                    'mt-1.5 flex items-center gap-1.5 px-1 text-[10px] text-slate-400',
                                    mine ? 'justify-end' : 'justify-start',
                                  ].join(' ')}
                                >
                                  <span>{item.time}</span>
                                  {mine && (
                                    <CheckCheck
                                      className={[
                                        'h-3.5 w-3.5',
                                        item.read ? 'text-blue-500' : 'text-slate-300',
                                      ].join(' ')}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Composer */}
                  <form
                    onSubmit={handleSend}
                    className="border-t border-slate-200/80 bg-white p-3 sm:p-4"
                  >
                    <div className="mx-auto flex max-w-4xl items-end gap-2">
                      <input
                        ref={fileRef}
                        type="file"
                        className="sr-only"
                        tabIndex={-1}
                        aria-hidden="true"
                        onChange={handleAttach}
                      />

                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        title="Attach file"
                        aria-label="Attach file"
                        className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"
                      >
                        <Paperclip className="h-4 w-4" />
                      </button>

                      <textarea
                        ref={composerRef}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' && !event.shiftKey) {
                            event.preventDefault()
                            event.currentTarget.form?.requestSubmit()
                          }
                        }}
                        rows={1}
                        aria-label={`Message ${activeConversation.name}`}
                        placeholder={`Message ${activeConversation.name}...`}
                        className="max-h-32 min-h-10 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />

                      <button
                        type="submit"
                        disabled={!message.trim()}
                        className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1657FF] text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                        title="Send message"
                        aria-label="Send message"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="mx-auto mt-2 max-w-4xl px-12 text-[9px] text-slate-400">
                      Press Enter to send · Shift + Enter for a new line
                    </p>
                  </form>
                </section>
              ) : (
                <section className="flex min-h-0 items-center justify-center bg-[#F7F9FC] p-8">
                  <div className="max-w-sm text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <h2 className="mt-4 text-lg font-bold text-[#0B1220]">
                      Select a conversation
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Choose a project contact from the left to view the conversation.
                    </p>
                  </div>
                </section>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Bottom note */}
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <p className="text-xs font-medium text-slate-600">
              Keep project-related communication inside Build OS for a clear project
              record.
            </p>
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            {totalUnread > 0
              ? `${totalUnread} unread message${totalUnread === 1 ? '' : 's'}`
              : 'All messages read'}
          </span>
        </div>

        <p className="text-center text-[10px] text-slate-400">
          Signed in as {displayName}
        </p>
      </div>
    </DashboardLayout>
  )
}

export default MessagesPage