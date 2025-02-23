export default function NavItem({isActive, onClickFn, content}: {isActive: boolean, content: string, onClickFn: () => void}) {
    return (
        <div className={`nav-item ${isActive ? "active": ""}`} onClick={onClickFn}>
            <a href="#">
                {content}
            </a>
        </div>
    )
}