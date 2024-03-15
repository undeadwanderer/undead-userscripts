# Tabun Filters

### English

A userscript for filtering out blog posts and comments on tabun.everypony.ru website.

This is a fork of an old script by CAHCET who abandoned it back in 2016.

License: The original author distributed it under WTFPL license and I'm not changing that.

Features: 

* Filter by blog: Open the blog list (/blogs) and check blogs you don't like under the "Фильтровать" column.
* Filter by user: Open the user profile and in the right column there are gonna be two radio switches, for comments (options: "Show all", "Hide images", "Hide comments") and for blog posts ("Show posts" and "Hide posts"). Hidden comments can be shown or downvoted.
* Settings: In blog view, there's a new link "Фильтры" in the right column, you can remove filtered blogs and users from there as well as the options above.

Changelog: 

* 1.16: Initial fork commit, added an option to filter blog posts by user, also added checks so the posts won't be hidden under certain circumstances (when viewing the blocked blog (user filter will still apply) or post directly, or browsing all posts made by a user).

Feature ideas:

* Looking into filtering by tags but that's not gonna be easy since the original author removed all code concerning tag support when they abandoned it (and I didn't save an older version).
* A way to filter a blog from its page, without having to open the entire blog list and search for it there.

---
### Russian

Юзерскрипт для фильтрации комментариев и постов на Табуне.

Форк давно заброшенного скрипта за авторством САНСЕТ.

Лицензия: WTFPL (делайте что хотите), автор оставил код под этой лицензией и я не буду это менять.

Функции:

* Фильтр блогов: В списке список блогов (/blogs) отметьте блоги которые вам не нравятся (чекбоксы в колонке "Фильтровать").
* Фильтр пользователей: На профиле пользователя в правой колонке есть два переключателя, для комментариев (опции "Показывать всё", "Скрывать картинки в комментариях", "Скрывать комментарии") и постов (опции "Показывать посты, "Скрывать посты"). Скрытые комменты можно показать или заминусовать не открывая.
* Настройки: В общем виде в правой колонке есть ссылка "Фильтры", через неё вы можете убрать отфильтрованные блоги и пользователей (в добавок к опциям выше).

Ченджлог: 

* 1.16: Мой первый коммит в этот форк, добавил возможность фильтровать блог-посты от определённых пользователей, также добавил проверки чтобы посты не скрывались при просмотре профилей, индивидуальных постов, и блогов (в последнем случае фильтр пользователей продолжает применяться).

На будущее:

* Рассматриваю возможность сделать фильтрацию по тегам но т.к. автор удалил из последней версии весь сопутствующий поддержке тегов код это будет непросто.
* Добавить возможность отфильтровать блог из его описания, без необходимости открывать список всех блогов и искать там.
