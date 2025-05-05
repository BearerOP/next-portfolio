import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function AvatarComponent() {
  return (
    <div className="relative rounded-full size-full bg-neutral-400 dark:bg-neutral-900 p-[.5px] shadow-md shadow-neutral-900/50 dark:shadow-neutral-600/10">
      <Avatar className="w-24 h-24  outline-lime-50">
        <AvatarImage src="/images/avatar.jpg" alt="Ankit Yadav" />
        <AvatarFallback>ay.</AvatarFallback>
      </Avatar>
    </div>
  )
}
