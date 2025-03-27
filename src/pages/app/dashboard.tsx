import { LockKeyhole, LockKeyholeOpen, Plus } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import AlphabetBar from "@/components/alphabet-bar";
import Button from "@/components/button";
import ContactsTable from "@/components/contacts-table";
import Input from "@/components/input";
import LabelButton from "@/components/label-button";
import { dataContacts } from "@/helpers/fake-data";
import { alphabet } from "@/types/alphabet.d";

const Dashboard = () => {
  const [isLocked, setIsLocked] = useState<boolean>(false);

  return (
    <>
      <Helmet title="Lista de Contatos" />
      <div className="flex items-center justify-between">
        <h1 className="text-content-body text-2xl leading-8 font-bold">
          Lista de contatos
        </h1>

        <div className="flex h-12 items-center justify-center gap-[10px]">
          <Input placeholder="Pesquisar" className="w-[321px] flex-1" />
          <Button
            content="Adicionar Contato"
            Icon={Plus}
            className="bg-bg-t text-content-p"
          />
          <LabelButton onClick={() => setIsLocked(!isLocked)}>
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
        <div className="custom-scroll mr-14 ml-[106px] flex w-full flex-col gap-[30px] overflow-y-scroll">
          {alphabet.map((letter) => {
            const contacts = dataContacts.filter((user) => {
              if (user.name.toUpperCase().startsWith(letter)) {
                return user;
              }
            });

            return (
              <>
                <div className="flex flex-col gap-5">
                  <p className="text-content-p text-sm font-semibold">
                    {letter}
                  </p>
                  <div className="bg-content-muted h-[1px] w-full"></div>
                </div>
                {contacts.length > 0 && <ContactsTable contacts={contacts} />}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
