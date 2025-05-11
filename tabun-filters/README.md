# Tabun Filters

[Описание на русском](#russian)

## English

A userscript for filtering blog posts and comments on the My Little Pony fansite tabun.everypony.ru.

This is a fork of an old script by CAHCET who abandoned it back in 2016.

### License:
The original author distributed it under the WTFPL license and I'm not changing that (for now, at least).

### Features: 

* Filter by blog: Either: a) Open the blog list (/blogs) and check blogs you don't like under the "Фильтровать" column; b) Open the blog's page and click the "Фильтровать блог" button in its description.
* Filter by user: Open the user profile and in the right column there are gonna be two radio switches, for comments (options to hide all comments or only images in comments) and for blog posts.
* Blog posts are hidden completely but will be displayed if you open the blog or user's page. Comments are hidden with a stub from which you can view the comment again.
* Settings: In blog view, there's a link "Фильтры" in the right column, you can remove filtered blogs and users from there (in addition to the options above).

### Version history: 

```
1.17.3 | 2025-05-10: Added an option to exclude certain authors from the filter.
1.17.2 | 2024-07-17: Fixed the script not working on /blog page.
                     Fixed personal blog posts pages not being excepted.
                     Fixed the last "filter comments" radiobox breaking the storage for the setting's variables.
                     Added a check to the comments filter function for the author field actually existing
                     (to prevent a specific error appearing if a comment has been deleted).
                     Commented out the code concerning the "downvote hidden comment" functionality
                     (you can decomment them if you so want but I think it's too toxic a feature to have).
1.17.1 | 2024-03-28: Included new Tabun domains.
1.17   | 2024-03-16: Added buttons to filter a blog from the respective blog's description
                     on its page instead of having to search for it in the list
                     (the latter option is still available).
1.16   | 2024-03-15: Initial fork commit, added an option to filter blog posts by user,
                     also added checks so the posts won't be hidden under certain circumstances
                     (when viewing the blocked blog (user filter will still apply) or post directly,
                     or browsing all posts made by a user).
```

### Possible future features:

* Looking into filtering by tags but that's not gonna be easy since the original author removed all code concerning tag support when they abandoned it (and I didn't save an older version).
* Got a vague idea to implement hiding individual posts by id.

---
## Russian

Юзерскрипт для фильтрации комментариев и постов на брони-коллективном блоге Табуне.

Форк давно заброшенного скрипта за авторством САНСЕТ.

### Лицензия:
WTFPL (делайте что хотите), автор оставил код под этой лицензией и я не буду это менять (по крайней мере, пока).

### Функции:

* Фильтр блогов: Либо: a) В списке блогов (/blogs) отметьте блоги которые вам не нравятся (чекбоксы в колонке "Фильтровать"); b) перейдите на страницу блога и в описании кликните кнопку "Фильтровать блог".
* Фильтр пользователей: На профиле пользователя в правой колонке есть два переключателя, для комментариев (опции "Показывать всё", "Скрывать картинки в комментариях", "Скрывать комментарии") и постов (опции "Показывать посты, "Скрывать посты", "Показывать все посты").
* Скрытые посты скрываются полностью (но показываются на странице соответствующего блога/юзера), скрытые комменты спрятаны за плашкой где можно открыть содержание коммента.
* Настройки: В общем виде в правой колонке есть ссылка "Фильтры", через неё вы можете убрать отфильтрованные блоги и пользователей (в добавок к опциям выше).

### Ченджлог: 

```
1.17.3 | 2025-05-10: Добавил опцию исключения авторов из фильтра (отображаются все их посты).
1.17.2 | 2024-07-17: Починил неактивацию скрипта на странице /blog.
                     Отключил активацию скрипта на блогпостах из персонального блога.
                     Починил поломку опцией скрытия комментариев значений хранилища для соответствующей переменной.
                     Добавил чек в функцию фильтра комментов, проверяющий есть ли у коммента автор
                     (чтобы исключить ошибку, возникающую если в треде есть удалённые модами комментарии).
                     Убрал из плейсхолдера скрытого коммента ссылку "Наказать" тк очень токсичная опция имо
                     (Она закомментирована, если вам ну прямо очень нужна, раскомментируйте).
1.17.1 | 2024-03-28: Добавлены новые домены табуна.
1.17   | 2024-03-16: Добавлены кнопки для добавления блога в список игнорируемых в описания
                     блогов на их соответствующих страницах, чтобы не было необходимости искать нужный
                     блог в общем списке (эта опция всё ещё доступна).
1.16   | 2024-03-15: Мой первый коммит в этот форк, добавлены возможность фильтровать блог-посты
                     от определённых пользователей, а также проверки чтобы посты не скрывались при просмотре профилей, 
                     индивидуальных постов, и блогов (в последнем случае фильтр пользователей продолжает применяться).
```

### Возможные идеи на будущее:

* Рассматриваю возможность сделать фильтрацию по тегам но т.к. автор удалил из последней версии весь сопутствующий поддержке тегов код это будет непросто.
* Есть смутная идея научить скрипт фильтровать индивидуальные посты по id.
