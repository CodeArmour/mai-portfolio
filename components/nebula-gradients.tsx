"use client"

export default function NebulaGradients() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Purple nebula in top right */}
      <div
        className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-gradient-radial from-purple-500/10 via-purple-500/5 to-transparent dark:from-purple-500/20 dark:via-purple-600/10 dark:to-transparent blur-3xl"
        style={{ transform: "rotate(-15deg)" }}
      />

      {/* Blue-purple nebula in bottom left */}
      <div
        className="absolute -bottom-[40%] -left-[30%] w-[80%] h-[80%] rounded-full bg-gradient-radial from-indigo-500/10 via-purple-500/5 to-transparent dark:from-indigo-500/15 dark:via-purple-500/5 dark:to-transparent blur-3xl"
        style={{ transform: "rotate(20deg)" }}
      />

      {/* Small accent nebula */}
      <div className="absolute top-[30%] left-[10%] w-[25%] h-[25%] rounded-full bg-gradient-radial from-pink-500/5 via-purple-500/3 to-transparent dark:from-pink-500/10 dark:via-purple-500/5 dark:to-transparent blur-3xl" />
    </div>
  )
}
