import {
  LockKeyhole,
  LockKeyholeOpen,
  Pencil,
  Trash,
  User,
} from "lucide-react";

import { Contact } from "@/types/user";

import Button from "./button";
import LabelButton from "./label-button";

interface ContactsTableProps {
  contacts: Contact[];
}

const ContactsTable = ({ contacts }: ContactsTableProps) => {
  const handleIsLockedChange = (isLocked: boolean) => (isLocked = !isLocked);

  return (
    <table className="text-content-p">
      <thead className="text-content-muted text-left">
        <tr>
          <th className="w-100">NOME</th>
          <th className="w-30">TELEFONE</th>
          <th className="w-100">EMAIL</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr>
            <td>
              <div className="mt-4 flex gap-4 p-3">
                <div className="bg-bg-t flex h-11 w-11 items-center justify-center place-self-start rounded-xl">
                  <User />
                </div>
                <div className="flex h-14 flex-col justify-end font-thin">
                  <p className="leading-10">{contact.name}</p>
                  <p className="leading-[22px]">{contact.description}</p>
                </div>
              </div>
            </td>
            <td>{contact.phone}</td>
            <td className="flex h-24 items-center justify-between">
              {contact.email}
              <div className="mt-1 flex items-center gap-2">
                <Button
                  content="Editar"
                  Icon={Pencil}
                  className="bg-bg-s border-bg-t not-disabled:hover:bg-bg-t not-disabled:hover:border-content-body rounded-[14px] border"
                />
                <LabelButton
                  onClick={() => handleIsLockedChange(contact.isLocked)}
                  className="h-12 w-12"
                >
                  {contact.isLocked ? (
                    <LockKeyhole className="h-4 w-4" />
                  ) : (
                    <LockKeyholeOpen className="h-4 w-4" />
                  )}
                </LabelButton>
                <LabelButton className="hover:text-accent-red hover:border-accent-red h-12 w-12">
                  <Trash className="h-4 w-4" />
                </LabelButton>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactsTable;
