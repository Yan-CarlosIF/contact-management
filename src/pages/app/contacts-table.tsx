import { Pencil, Trash } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Contact } from "@/api/get-contacts";
import userTable from "@/assets/user_img_table.svg";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { encryptString } from "@/helpers/encrypt-string";

import Button from "../../components/button";
import LabelButton from "../../components/label-button";
import DeleteContactPopover from "./delete-contact-popover";
import EditContactModal from "./edit-contact-modal";

interface ContactsTableProps {
  contacts: Contact[];
}

const ContactsTable = ({ contacts }: ContactsTableProps) => {
  const [searchParams] = useSearchParams();
  const isLocked = searchParams.get("isLocked") === "true";

  return (
    <table className="text-content-p">
      <thead className="text-content-muted text-left">
        <tr>
          <th className="w-100">NOME</th>
          <th className="w-40">TELEFONE</th>
          <th className="w-120">EMAIL</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td>
              <div className="mt-4 flex gap-4 p-3">
                <div className="bg-bg-t flex h-11 w-11 items-center justify-center place-self-start rounded-xl">
                  <img
                    className="h-11 w-11 rounded-2xl"
                    src={contact.avatar_url ?? userTable}
                    alt="Avatar do contato"
                    onError={(e) => (e.currentTarget.src = userTable)}
                  />
                </div>
                <div className="flex h-11 flex-col justify-center font-thin">
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
                      className="bg-bg-s border-bg-t not-disabled:hover:bg-bg-t not-disabled:hover:border-content-body rounded-[14px] border px-6"
                    />
                  </DialogTrigger>
                  <EditContactModal contact={contact} />
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <LabelButton className="hover:text-accent-red hover:border-accent-red h-13 w-13">
                      <Trash className="h-4 w-4" />
                    </LabelButton>
                  </DialogTrigger>
                  <DeleteContactPopover contact={contact} />
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
