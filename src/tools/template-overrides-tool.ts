export function listTemplateOverrides(controller?: string): object {
  const templateOverrides = getTemplateOverrides();

  let filtered = templateOverrides;

  if (controller) {
    const controllerLower = controller.toLowerCase();
    filtered = templateOverrides.filter(t => t.controller.toLowerCase() === controllerLower);
  }

  return {
    total: filtered.length,
    controller: controller || 'all',
    overrides: filtered.map(t => ({
      controller: t.controller,
      action: t.action,
      path: t.path,
      description: t.description,
      category: t.category,
    })),
  };
}

export function getTemplateOverrideInfo(controller: string, action?: string): object {
  const templateOverrides = getTemplateOverrides();
  const controllerLower = controller.toLowerCase();

  const found = templateOverrides.find(
    t =>
      t.controller.toLowerCase() === controllerLower &&
      (action ? t.action?.toLowerCase() === action.toLowerCase() : !t.action)
  );

  if (!found) {
    return {
      error: `Override not found for controller "${controller}"${action ? ` and action "${action}"` : ''}`,
      available: templateOverrides
        .filter(t => t.controller.toLowerCase() === controllerLower)
        .map(t => ({
          action: t.action || 'index',
          path: t.path,
        })),
    };
  }

  return {
    controller: found.controller,
    action: found.action,
    path: found.path,
    description: found.description,
    category: found.category,
    example: `<?php
// В вашем шаблоне: templates/{theme}/controllers/${found.controller}/${found.action || 'index'}.tpl.php
// Или через renderPartial:
echo $this->renderPartial('${found.controller}', '${found.action || 'index'}', $vars);
`,
  };
}

interface TemplateOverride {
  controller: string;
  action?: string;
  path: string;
  description: string;
  category: string;
}

function getTemplateOverrides(): TemplateOverride[] {
  return [
    {
      controller: 'content',
      action: 'index',
      path: 'templates/default/controllers/content/index.tpl.php',
      description: 'Страница списка контента',
      category: 'content',
    },
    {
      controller: 'content',
      action: 'view',
      path: 'templates/default/controllers/content/view.tpl.php',
      description: 'Страница просмотра материала',
      category: 'content',
    },
    {
      controller: 'content',
      action: 'item',
      path: 'templates/default/controllers/content/item.tpl.php',
      description: 'Карточка материала в списке',
      category: 'content',
    },
    {
      controller: 'content',
      action: 'category',
      path: 'templates/default/controllers/content/category.tpl.php',
      description: 'Страница категории',
      category: 'content',
    },
    {
      controller: 'users',
      action: 'index',
      path: 'templates/default/controllers/users/index.tpl.php',
      description: 'Профили пользователей',
      category: 'users',
    },
    {
      controller: 'users',
      action: 'profile',
      path: 'templates/default/controllers/users/profile.tpl.php',
      description: 'Страница профиля пользователя',
      category: 'users',
    },
    {
      controller: 'users',
      action: 'registration',
      path: 'templates/default/controllers/users/registration.tpl.php',
      description: 'Форма регистрации',
      category: 'users',
    },
    {
      controller: 'users',
      action: 'auth',
      path: 'templates/default/controllers/users/auth.tpl.php',
      description: 'Форма авторизации',
      category: 'users',
    },
    {
      controller: 'comments',
      action: 'index',
      path: 'templates/default/controllers/comments/index.tpl.php',
      description: 'Список комментариев',
      category: 'comments',
    },
    {
      controller: 'comments',
      action: 'item',
      path: 'templates/default/controllers/comments/item.tpl.php',
      description: 'Один комментарий',
      category: 'comments',
    },
    {
      controller: 'photos',
      action: 'index',
      path: 'templates/default/controllers/photos/index.tpl.php',
      description: 'Альбомы фотографий',
      category: 'photos',
    },
    {
      controller: 'photos',
      action: 'album',
      path: 'templates/default/controllers/photos/album.tpl.php',
      description: 'Фотографии альбома',
      category: 'photos',
    },
    {
      controller: 'photos',
      action: 'image',
      path: 'templates/default/controllers/photos/image.tpl.php',
      description: 'Просмотр одного фото',
      category: 'photos',
    },
    {
      controller: 'blogs',
      action: 'index',
      path: 'templates/default/controllers/blogs/index.tpl.php',
      description: 'Список блогов',
      category: 'blogs',
    },
    {
      controller: 'blogs',
      action: 'post',
      path: 'templates/default/controllers/blogs/post.tpl.php',
      description: 'Пост в блоге',
      category: 'blogs',
    },
    {
      controller: 'forums',
      action: 'index',
      path: 'templates/default/controllers/forums/index.tpl.php',
      description: 'Список форумов',
      category: 'forums',
    },
    {
      controller: 'forums',
      action: 'thread',
      path: 'templates/default/controllers/forums/thread.tpl.php',
      description: 'Тема форума',
      category: 'forums',
    },
    {
      controller: 'forums',
      action: 'post',
      path: 'templates/default/controllers/forums/post.tpl.php',
      description: 'Пост на форуме',
      category: 'forums',
    },
    {
      controller: 'messages',
      action: 'index',
      path: 'templates/default/controllers/messages/index.tpl.php',
      description: 'Личные сообщения',
      category: 'messages',
    },
    {
      controller: 'messages',
      action: 'chat',
      path: 'templates/default/controllers/messages/chat.tpl.php',
      description: 'Чат сообщений',
      category: 'messages',
    },
    {
      controller: 'wall',
      action: 'index',
      path: 'templates/default/controllers/wall/index.tpl.php',
      description: 'Записи на стене',
      category: 'wall',
    },
    {
      controller: 'wall',
      action: 'entry',
      path: 'templates/default/controllers/wall/entry.tpl.php',
      description: 'Одна запись на стене',
      category: 'wall',
    },
    {
      controller: 'activity',
      action: 'index',
      path: 'templates/default/controllers/activity/index.tpl.php',
      description: 'Лента активности',
      category: 'activity',
    },
    {
      controller: 'groups',
      action: 'index',
      path: 'templates/default/controllers/groups/index.tpl.php',
      description: 'Список групп',
      category: 'groups',
    },
    {
      controller: 'groups',
      action: 'view',
      path: 'templates/default/controllers/groups/view.tpl.php',
      description: 'Страница группы',
      category: 'groups',
    },
    {
      controller: 'board',
      action: 'index',
      path: 'templates/default/controllers/board/index.tpl.php',
      description: 'Доска объявлений',
      category: 'board',
    },
    {
      controller: 'board',
      action: 'item',
      path: 'templates/default/controllers/board/item.tpl.php',
      description: 'Объявление',
      category: 'board',
    },
    {
      controller: 'board',
      action: 'add',
      path: 'templates/default/controllers/board/add.tpl.php',
      description: 'Форма добавления объявления',
      category: 'board',
    },
    {
      controller: 'catalog',
      action: 'index',
      path: 'templates/default/controllers/catalog/index.tpl.php',
      description: 'Каталог товаров',
      category: 'catalog',
    },
    {
      controller: 'catalog',
      action: 'item',
      path: 'templates/default/controllers/catalog/item.tpl.php',
      description: 'Страница товара',
      category: 'catalog',
    },
    {
      controller: 'search',
      action: 'index',
      path: 'templates/default/controllers/search/index.tpl.php',
      description: 'Результаты поиска',
      category: 'search',
    },
    {
      controller: 'tags',
      action: 'index',
      path: 'templates/default/controllers/tags/index.tpl.php',
      description: 'Страница тега',
      category: 'tags',
    },
    {
      controller: 'favorites',
      action: 'index',
      path: 'templates/default/controllers/favorites/index.tpl.php',
      description: 'Избранное пользователя',
      category: 'favorites',
    },
    {
      controller: 'feed',
      action: 'index',
      path: 'templates/default/controllers/feed/index.tpl.php',
      description: 'Лента контента',
      category: 'feed',
    },
  ];
}
