/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as authSignupImport } from './routes/(auth)/signup'
import { Route as authSigninImport } from './routes/(auth)/signin'
import { Route as wwwDashboardRouteImport } from './routes/(www)/dashboard/route'
import { Route as wwwChatRouteImport } from './routes/(www)/chat/route'
import { Route as wwwDashboardIndexImport } from './routes/(www)/dashboard/index'
import { Route as wwwChatIndexImport } from './routes/(www)/chat/index'
import { Route as wwwChatIdImport } from './routes/(www)/chat/$id'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const authSignupRoute = authSignupImport.update({
  id: '/(auth)/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const authSigninRoute = authSigninImport.update({
  id: '/(auth)/signin',
  path: '/signin',
  getParentRoute: () => rootRoute,
} as any)

const wwwDashboardRouteRoute = wwwDashboardRouteImport.update({
  id: '/(www)/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const wwwChatRouteRoute = wwwChatRouteImport.update({
  id: '/(www)/chat',
  path: '/chat',
  getParentRoute: () => rootRoute,
} as any)

const wwwDashboardIndexRoute = wwwDashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => wwwDashboardRouteRoute,
} as any)

const wwwChatIndexRoute = wwwChatIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => wwwChatRouteRoute,
} as any)

const wwwChatIdRoute = wwwChatIdImport.update({
  id: '/$id',
  path: '/$id',
  getParentRoute: () => wwwChatRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/(www)/chat': {
      id: '/(www)/chat'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof wwwChatRouteImport
      parentRoute: typeof rootRoute
    }
    '/(www)/dashboard': {
      id: '/(www)/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof wwwDashboardRouteImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/signin': {
      id: '/(auth)/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof authSigninImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/signup': {
      id: '/(auth)/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof authSignupImport
      parentRoute: typeof rootRoute
    }
    '/(www)/chat/$id': {
      id: '/(www)/chat/$id'
      path: '/$id'
      fullPath: '/chat/$id'
      preLoaderRoute: typeof wwwChatIdImport
      parentRoute: typeof wwwChatRouteImport
    }
    '/(www)/chat/': {
      id: '/(www)/chat/'
      path: '/'
      fullPath: '/chat/'
      preLoaderRoute: typeof wwwChatIndexImport
      parentRoute: typeof wwwChatRouteImport
    }
    '/(www)/dashboard/': {
      id: '/(www)/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof wwwDashboardIndexImport
      parentRoute: typeof wwwDashboardRouteImport
    }
  }
}

// Create and export the route tree

interface wwwChatRouteRouteChildren {
  wwwChatIdRoute: typeof wwwChatIdRoute
  wwwChatIndexRoute: typeof wwwChatIndexRoute
}

const wwwChatRouteRouteChildren: wwwChatRouteRouteChildren = {
  wwwChatIdRoute: wwwChatIdRoute,
  wwwChatIndexRoute: wwwChatIndexRoute,
}

const wwwChatRouteRouteWithChildren = wwwChatRouteRoute._addFileChildren(
  wwwChatRouteRouteChildren,
)

interface wwwDashboardRouteRouteChildren {
  wwwDashboardIndexRoute: typeof wwwDashboardIndexRoute
}

const wwwDashboardRouteRouteChildren: wwwDashboardRouteRouteChildren = {
  wwwDashboardIndexRoute: wwwDashboardIndexRoute,
}

const wwwDashboardRouteRouteWithChildren =
  wwwDashboardRouteRoute._addFileChildren(wwwDashboardRouteRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/chat': typeof wwwChatRouteRouteWithChildren
  '/dashboard': typeof wwwDashboardRouteRouteWithChildren
  '/signin': typeof authSigninRoute
  '/signup': typeof authSignupRoute
  '/chat/$id': typeof wwwChatIdRoute
  '/chat/': typeof wwwChatIndexRoute
  '/dashboard/': typeof wwwDashboardIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/signin': typeof authSigninRoute
  '/signup': typeof authSignupRoute
  '/chat/$id': typeof wwwChatIdRoute
  '/chat': typeof wwwChatIndexRoute
  '/dashboard': typeof wwwDashboardIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/(www)/chat': typeof wwwChatRouteRouteWithChildren
  '/(www)/dashboard': typeof wwwDashboardRouteRouteWithChildren
  '/(auth)/signin': typeof authSigninRoute
  '/(auth)/signup': typeof authSignupRoute
  '/(www)/chat/$id': typeof wwwChatIdRoute
  '/(www)/chat/': typeof wwwChatIndexRoute
  '/(www)/dashboard/': typeof wwwDashboardIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/chat'
    | '/dashboard'
    | '/signin'
    | '/signup'
    | '/chat/$id'
    | '/chat/'
    | '/dashboard/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/signin' | '/signup' | '/chat/$id' | '/chat' | '/dashboard'
  id:
    | '__root__'
    | '/'
    | '/(www)/chat'
    | '/(www)/dashboard'
    | '/(auth)/signin'
    | '/(auth)/signup'
    | '/(www)/chat/$id'
    | '/(www)/chat/'
    | '/(www)/dashboard/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  wwwChatRouteRoute: typeof wwwChatRouteRouteWithChildren
  wwwDashboardRouteRoute: typeof wwwDashboardRouteRouteWithChildren
  authSigninRoute: typeof authSigninRoute
  authSignupRoute: typeof authSignupRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  wwwChatRouteRoute: wwwChatRouteRouteWithChildren,
  wwwDashboardRouteRoute: wwwDashboardRouteRouteWithChildren,
  authSigninRoute: authSigninRoute,
  authSignupRoute: authSignupRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/(www)/chat",
        "/(www)/dashboard",
        "/(auth)/signin",
        "/(auth)/signup"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/(www)/chat": {
      "filePath": "(www)/chat/route.tsx",
      "children": [
        "/(www)/chat/$id",
        "/(www)/chat/"
      ]
    },
    "/(www)/dashboard": {
      "filePath": "(www)/dashboard/route.tsx",
      "children": [
        "/(www)/dashboard/"
      ]
    },
    "/(auth)/signin": {
      "filePath": "(auth)/signin.tsx"
    },
    "/(auth)/signup": {
      "filePath": "(auth)/signup.tsx"
    },
    "/(www)/chat/$id": {
      "filePath": "(www)/chat/$id.tsx",
      "parent": "/(www)/chat"
    },
    "/(www)/chat/": {
      "filePath": "(www)/chat/index.tsx",
      "parent": "/(www)/chat"
    },
    "/(www)/dashboard/": {
      "filePath": "(www)/dashboard/index.tsx",
      "parent": "/(www)/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
