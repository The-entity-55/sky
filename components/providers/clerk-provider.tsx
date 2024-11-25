"use client"

import { ClerkProvider as Clerk } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

const appearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "hsl(var(--primary))",
    colorBackground: "hsl(var(--background))",
    colorText: "hsl(var(--foreground))",
    colorInputBackground: "hsl(var(--background))",
    colorInputText: "hsl(var(--foreground))",
    colorTextSecondary: "hsl(var(--muted-foreground))",
  },
  elements: {
    formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
    footerActionLink: "text-primary hover:text-primary/90",
    card: "bg-background",
    headerTitle: "text-foreground",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton: "text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    dividerLine: "bg-border",
    formFieldLabel: "text-foreground",
    formFieldInput: "bg-background text-foreground border-input",
    formFieldInputShowPasswordButton: "text-foreground",
    footer: "text-muted-foreground",
    identityPreviewText: "text-foreground",
    identityPreviewEditButton: "text-primary hover:text-primary/90",
  },
}

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <Clerk
      appearance={appearance}
    >
      {children}
    </Clerk>
  )
}
