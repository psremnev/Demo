import { openLink } from 'utils/openLink';
import { Button, BUTTONS_TYPE } from 'button';
import { IContactsOptions } from 'Contacts/IContacts';

/**
 * @link Contacts/Contacts
 * @description Контакты
 */
export default function Contacts({
  className = '',
  vk = '',
  telegram = ''
}: IContactsOptions) {
  const contacts = [
    { url: 'public/vk.png', link: vk },
    { url: 'public/telegram.png', link: telegram }
  ];

  return (
    <section className={`contacts flexbox ${className}`}>
      {contacts.map((item, index) => (
        <div key={index} className="contacts-item marginRight-s">
          <Button
            type={BUTTONS_TYPE.IMAGE}
            imageUrl={item.url}
            imageSize={25}
            onClick={() => openLink(item.link, true)}
          />
        </div>
      ))}
    </section>
  );
}
