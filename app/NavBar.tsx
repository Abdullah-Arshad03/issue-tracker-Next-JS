"use client";

import React from "react";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation"; // this only works with the client component so we have to use the ' use client' above at the top
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { boolean } from "zod";
import { Box, Flex, DropdownMenu, Avatar, Text } from "@radix-ui/themes";
import { Container } from "@radix-ui/themes";
import Loader from "./components/Loader";

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  const { status, data: session } = useSession();
  console.log("this is the status of the user : ", status);

  const links = [
    {
      label: "Description",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  return (
    <>
      <nav className="flex space-x-8 border-b mb-5 px-6 py-4  items-center">
        <Container>
          <Flex justify="between">
            <Flex align="center" gap="3">
              <Link href="">
                <FaBug />{" "}
              </Link>
              <ul className="flex space-x-6 ">
                {links.map((link) => (
                  <>
                    <li key={link.href}>
                      {" "}
                      <Link
                        href={link.href}
                        className={classNames({
                          "text-zinc-900": link.href === currentPath,
                          "text-zinc-500": link.href !== currentPath,
                          "hover:text-zinc-900 transition-colors": true,
                        })}
                      >
                        {link.label}
                      </Link>{" "}
                    </li>
                  </>
                ))}
              </ul>
            </Flex>
            <Box>
              {status === "loading" && <Loader />}

              {status === "authenticated" && (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Avatar
                      src={session.user!.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                      className="cursor-pointer"
                      referrerPolicy="no-referrer"
                    />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>
                      {/* // we wrapped inside the Text component to make email look bit larger by giving it a size */}
                      <Text size="2">{session.user!.email}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                      <Link href="/api/auth/signout">Log out</Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              )}
              {status === "unauthenticated" && (
                <Link href="/api/auth/signin">Login</Link>
              )}
            </Box>
          </Flex>
        </Container>
      </nav>
    </>
  );
};

export default NavBar;
