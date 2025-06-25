"use client";

import supabase from "@/config/supabaseClients";
import Contact from "@/types/contacts";
import { useQuery } from "@tanstack/react-query";
import { Handshake } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Loader from "./Loader";

const ContactMe = () => {
  const t = useTranslations("contact");

  const [contacts, setContacts] = useState<Contact[]>([]);

  const { isLoading } = useQuery({
    queryFn: async (): Promise<Contact[]> => {
      const { data } = await supabase.from("contacts").select("*").order("id");
      setContacts(data || []);
      return data || [];
    },
    queryKey: ["Skills"],
    gcTime: 1000 * 60,
  });

  return (
    <div className="container px-4 md:px-8 lg:px-16 xl:px-32 mx-auto py-52">
      <div
        data-aos="fade-down"
        className="disAos text-3xl mb-12 font-bold text-center flex justify-center items-center gap-2"
      >
        {t("Contact Us").toUpperCase()}
        <Handshake />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex gap-4 items-center justify-center flex-wrap">
          {contacts.map((contact) => (
            <Link
              href={contact.url}
              className="box"
              data-aos="zoom-in"
              key={contact.id}
            >
              <Image
                src={contact.img}
                alt={contact.title}
                width={80}
                height={80}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMe;
