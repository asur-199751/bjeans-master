import s from './category-filter.module.scss'
import Link from 'next/link'

const CategoryFilter = ({
  categories,
  menu,
  category,
  parentCategory,
  getActiveStatus,
}) => {
  return (
    <div className={menu ? s.menuType : s.type}>
      {category && category.parent ? (
        <Link
          href={
            parentCategory.slug === category.parent.slug
              ? `/catalog/${parentCategory.slug}`
              : `/catalog/${parentCategory.slug}/${category.parent.slug}`
          }
        >
          <a onClick={() => getActiveStatus && getActiveStatus(false)}>
            Назад в {category.parent.name}
          </a>
        </Link>
      ) : null}

      {categories &&
        categories.map(
          (r, i) =>
            r.name !== 'КОМБИНЕЗОНЫ' && (
              <>
                <Link key={i} href={r.link}>
                  <a onClick={() => getActiveStatus && getActiveStatus(false)}>
                    {r.name}
                  </a>
                </Link>
                {r.name === 'ДЖИНСЫ' &&
                  r.children?.map(({ name, slug }, i) => (
                    <Link key={i} href={r.joki + slug}>
                      <a
                        onClick={() =>
                          getActiveStatus && getActiveStatus(false)
                        }
                        className={s.jokiLink}
                      >
                        {name}
                      </a>
                    </Link>
                  ))}
              </>
            )
        )}
    </div>
  )
}
export default CategoryFilter
