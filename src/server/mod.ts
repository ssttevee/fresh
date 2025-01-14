import { ServerContext } from "./context.ts";
import { serve } from "./deps.ts";
export { Status } from "./deps.ts";
import {
  AppModule,
  ErrorPageModule,
  IslandModule,
  LayoutModule,
  MiddlewareModule,
  RouteModule,
  StartOptions,
  UnknownPageModule,
} from "./types.ts";
export type {
  AppProps,
  ErrorHandler,
  ErrorHandlerContext,
  ErrorPageProps,
  FreshOptions,
  Handler,
  HandlerContext,
  Handlers,
  MiddlewareHandler,
  MiddlewareHandlerContext,
  PageProps,
  Plugin,
  PluginRenderResult,
  PluginRenderScripts,
  PluginRenderStyleTag,
  RenderFunction,
  RouteConfig,
  StartOptions,
  UnknownHandler,
  UnknownHandlerContext,
  UnknownPageProps,
} from "./types.ts";
export { RenderContext } from "./render.ts";
export type { InnerRenderFunction } from "./render.ts";

export interface Manifest {
  routes: Record<
    string,
    | RouteModule
    | MiddlewareModule
    | LayoutModule
    | AppModule
    | ErrorPageModule
    | UnknownPageModule
  >;
  islands: Record<string, IslandModule>;
  baseUrl: string;
  config?: DenoConfig;
}

export interface DenoConfig {
  importMap: string;
  compilerOptions?: {
    jsx?: string;
    jsxImportSource?: string;
  };
}

export { ServerContext };

export async function start(routes: Manifest, opts: StartOptions = {}) {
  const ctx = await ServerContext.fromManifest(routes, opts);
  opts.port ??= 8000;
  if (opts.experimentalDenoServe === true) {
    // @ts-ignore as `Deno.serve` is still unstable.
    await Deno.serve(ctx.handler() as Deno.ServeHandler, opts);
  } else {
    await serve(ctx.handler(), opts);
  }
}

export async function bundle(
  routes: Manifest,
  {
    dir,
    ...opts
  }: Pick<StartOptions, "plugins" | "production"> & { dir?: string },
) {
  return (await ServerContext.fromManifest(routes, opts)).buildClientSide(dir);
}
