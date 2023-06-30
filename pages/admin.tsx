import { GetServerSideProps, NextPage } from "next"
import React from "react"
import Custom404 from './404'

type Props = {
  ip: string
}

const SSRPage: NextPage<Props> = ({ ip }) => {
    if (ip == process.env.ADMIN_IP) {
        return <div>This div is visible to certain IP addresses.</div>
      } else {
        return <Custom404 />
      }
}

export default SSRPage

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