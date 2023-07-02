import { GetServerSideProps } from "next"
import React from "react"
import Custom404 from './404'

type Props = {
  ip: string
}

export default function SSRPage({ ip }: Props) {
  if (ip === process.env.ADMIN_IP) {
    return <div>This div is visible to certain IP addresses.</div>
  }
  return <Custom404 />
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let ip = req.headers["x-real-ip"]
  if (!ip) {
    const forwardedFor = req.headers["x-forwarded-for"]
    if (Array.isArray(forwardedFor)) {
      ip = forwardedFor.at(0)
    } else {
      ip = forwardedFor?.split(",").at(0) ?? "Unknown"
    }
  }
  return {
    props: {
      ip,
    },
  }
}