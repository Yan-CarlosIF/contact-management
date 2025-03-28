import {
  LockKeyhole,
  LockKeyholeOpen,
  Pencil,
  Trash,
  User,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { encryptString } from "@/helpers/encrypt-string";
import { Contact } from "@/types/user";

import Button from "../../components/button";
import LabelButton from "../../components/label-button";
import DeleteContactModal from "./delete-contact-modal";
import EditContactModal from "./edit-contact-modal";

interface ContactsTableProps {
  contacts: Contact[];
}

const ContactsTable = ({ contacts }: ContactsTableProps) => {
  const [searchParams] = useSearchParams();
  const isLocked = searchParams.get("isLocked") === "true";
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
                  {contact.avatar_url ? (
                    <img
                      className="h-11 w-11 rounded-xl"
                      src={contact.avatar_url}
                      alt="Avatar do contato"
                    />
                  ) : (
                    <User />
                  )}
                </div>
                <div className="flex h-14 flex-col justify-end font-thin">
                  <p className="leading-10">{contact.name}</p>
                  <p className="leading-[22px]">
                    {!isLocked
                      ? contact.description
                      : encryptString(contact.description?.length)}
                  </p>
                </div>
              </div>
            </td>
            <td>
              {!isLocked ? contact.phone : encryptString(contact.phone.length)}
            </td>
            <td className="flex h-24 items-center justify-between">
              {!isLocked ? contact.email : encryptString(contact.email.length)}
              <div className="mt-1 flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      content="Editar"
                      Icon={Pencil}
                      className="bg-bg-s border-bg-t not-disabled:hover:bg-bg-t not-disabled:hover:border-content-body rounded-[14px] border"
                    />
                  </DialogTrigger>
                  <EditContactModal contact={contact} />
                </Dialog>

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
                <Dialog>
                  <DialogTrigger asChild>
                    <LabelButton className="hover:text-accent-red hover:border-accent-red h-12 w-12">
                      <Trash className="h-4 w-4" />
                    </LabelButton>
                  </DialogTrigger>
                  <DeleteContactModal />
                </Dialog>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactsTable;
