import { useQuery } from "@tanstack/react-query";
import { Ellipsis, LockKeyhole, LockKeyholeOpen, Plus } from "lucide-react";
import { useState } from "react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

import { getContacts } from "@/api/get-contacts";
import AlphabetBar from "@/components/alphabet-bar";
import Button from "@/components/button";
import Input from "@/components/input";
import LabelButton from "@/components/label-button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ContactsTable from "@/pages/app/contacts-table";
import { alphabet } from "@/types/alphabet.d";

import AddContactModal from "./add-contact-modal";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [InputSearch, setInputSearch] = useState<string>("");
  const isLocked = searchParams.get("isLocked") === "true";
  const letterSort = searchParams.get("letterSort");

  const sortedAlphabet = letterSort ? [letterSort] : alphabet;

  const alphabetContacts = sortedAlphabet ? sortedAlphabet : alphabet;

  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputSearch(value);

    const newParams = new URLSearchParams(searchParams);

    if (value.trim() === "") {
      newParams.delete("letterSort");
    } else {
      const firstLetter = value.charAt(0).toUpperCase();
      newParams.set("letterSort", firstLetter);
    }

    setSearchParams(newParams);
  };

  const handleIsLockedChange = () => {
    const newParams = new URLSearchParams(searchParams);
    const newLockStatus = !isLocked;
    newParams.set("isLocked", newLockStatus ? "true" : "false");
    setSearchParams(newParams);
  };

  const { data: dataContacts, isPending: isPendingContacts } = useQuery({
    queryKey: ["get-contacts"],
    queryFn: getContacts,
  });

  return (
    <>
      <Helmet title="Lista de Contatos" />
      <div className="flex items-center justify-between">
        <h1 className="text-content-body text-3xl leading-8 font-bold">
          Lista de contatos
        </h1>

        <div className="flex h-12 items-center justify-center gap-[10px]">
          <Input
            placeholder="Pesquisar"
            className="w-[321px] flex-1"
            value={InputSearch}
            onChange={handleInputSearchChange}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button
                content="Adicionar Contato"
                Icon={Plus}
                className="bg-bg-t text-content-p"
              />
            </DialogTrigger>
            <AddContactModal />
          </Dialog>
          <LabelButton onClick={handleIsLockedChange} className="max-w-12">
            {isLocked ? (
              <LockKeyhole className="h-4 w-4" />
            ) : (
              <LockKeyholeOpen className="h-4 w-4" />
            )}
          </LabelButton>
        </div>
      </div>
      <div className="mt-8 flex h-[589px]">
        <AlphabetBar />
        {!isPendingContacts ? (
          <div className="custom-scroll mr-14 ml-[106px] flex w-full flex-col gap-[30px] overflow-y-scroll">
            {alphabetContacts.map((letter) => {
              let contacts;

              if (dataContacts) {
                contacts = dataContacts.filter((user) => {
                  if (
                    user.name.toUpperCase().startsWith(letter.toUpperCase())
                  ) {
                    return user;
                  }
                });
              }

              if (InputSearch.length > 0) {
                contacts = contacts?.filter((contact) =>
                  contact.name
                    .toLowerCase()
                    .includes(InputSearch.toLowerCase()),
                );
              }

              return (
                <React.Fragment key={letter}>
                  <div className="flex flex-col gap-5">
                    <p className="text-content-p text-sm font-semibold">
                      {letter}
                    </p>
                    <div className="bg-content-muted h-[1px] w-full"></div>
                  </div>
                  {contacts && contacts.length > 0 && (
                    <ContactsTable contacts={contacts} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Ellipsis className="text-content-p flex h-12 w-12 animate-ping items-center justify-center" />
            <p className="text-content-ph mt-4">
              Primeira requisição demora um pouco por que o servidor entrou em
              modo hibernate, aguarde...
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
