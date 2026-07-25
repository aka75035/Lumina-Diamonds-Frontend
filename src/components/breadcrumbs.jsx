import { Link, useLocation } from "react-router-dom";

export default function BreadCrumbs({forBreadCrumbs}) {
    const location = useLocation();

    const pathParts = location.pathname
        .split("/")
        .filter(Boolean);

    pathParts[pathParts.length - 1] = forBreadCrumbs?.title || forBreadCrumbs?.name || pathParts[pathParts.length - 1] ;

    return (
        <nav className="flex text-xs sm:text-sm lg:text-base gap-2">
            <Link to="/">HOME</Link>

            {pathParts.map((part, index) => {
                const path = "/" + pathParts
                    .slice(0, index + 1)
                    .join("/");

                return (
                    <Link key={index} to={path}>
                        / {part.toUpperCase()}
                    </Link>
                );
            })}
        </nav>
    );
}