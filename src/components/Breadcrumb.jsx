import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Breadcrumb.css';

// crumbs: [{ label: 'Home', path: '/' }, { label: 'Futsal', path: '/futsal-ground-lahore' }]
const Breadcrumb = ({ crumbs }) => {
    return (
        <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol className="breadcrumb-list">
                {crumbs.map((crumb, i) => {
                    const isLast = i === crumbs.length - 1;
                    return (
                        <li key={crumb.path} className="breadcrumb-item">
                            {isLast ? (
                                <span className="breadcrumb-current" aria-current="page">{crumb.label}</span>
                            ) : (
                                <>
                                    <Link to={crumb.path} className="breadcrumb-link">{crumb.label}</Link>
                                    <ChevronRight size={14} className="breadcrumb-sep" />
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
