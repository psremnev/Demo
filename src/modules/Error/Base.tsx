import 'Error/Base.scss';

export default function({
    className = '',
    message,
    link = '/',
    linkTitle = 'Перейти на главную'
}) {
    return <div className={`app-error ${className}`}>{message}<a href={link}>{linkTitle}</a></div>
}