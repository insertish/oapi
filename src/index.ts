// This file was auto-generated by @insertish/oapi!
import type { APIRoutes } from "./routes.js";

export * from "./types.js";

import { defaultBaseURL } from "./baseURL.js";
import { pathResolve, queryParams } from "./params.js";

type Methods = APIRoutes["method"];
type PickRoutes<Method extends Methods> = APIRoutes & { method: Method };

type GetRoutes = PickRoutes<"get">;
type PatchRoutes = PickRoutes<"patch">;
type PutRoutes = PickRoutes<"put">;
type DeleteRoutes = PickRoutes<"delete">;
type PostRoutes = PickRoutes<"post">;

type Count<
  Str extends string,
  SubStr extends string,
  Matches extends null[] = []
> = Str extends `${infer _}${SubStr}${infer After}`
  ? Count<After, SubStr, [...Matches, null]>
  : Matches["length"];

/**
 * Get the specific path name of any given path.
 * @param anyPath Any path
 * @returns Specific path
 */
export function getPathName(anyPath: string) {
  const segments = anyPath.split("/");

  const list =
    (pathResolve as unknown as Record<string, (string | [string])[]>)[
      (segments.length - 1).toString()
    ] || [];
  for (const entry of list) {
    let i = 1;
    let copy = [...segments];
    for (i; i < segments.length; i++) {
      if (Array.isArray(entry[i - 1])) {
        copy[i] = entry[i - 1];
        continue;
      } else if (entry[i - 1] !== segments[i]) break;
    }

    if (i === segments.length) return copy.join("/");
  }
}

/**
 * Client configuration options
 */
export interface Options {
  /**
   * Base URL of the Revolt node
   */
  baseURL: string;
  /**
   * Additional headers to apply to requests
   */
  headers?: Record<string, any>;
  /**
   * Authentication used for requests
   */
  authentication: {
    rauth?: string | undefined;
    revolt?: { token: string } | string | undefined;
    headers?: Record<string, any>;
  };
}

/**
 * Request options
 */
export interface RequestOptions {
  /**
   * The base URL used for this request
   */
  baseURL?: string;
  /**
   * The type of response given
   */
  responseType?: "blob" | "json" | "text" | "arrayBuffer";
  /**
   * Headers to apply for this request
   */
  headers?: Record<string, any>;
}

/**
 * API Client
 */
export class API {
  private baseURL: Options["baseURL"];
  private authentication: Options["authentication"];
  private headers: Options["headers"];

  constructor({ baseURL, authentication, headers }: Partial<Options> = {}) {
    this.baseURL = baseURL || defaultBaseURL;
    this.authentication = authentication || {};
    this.headers = headers || {};
  }

  /**
   * Generate authentication options.
   */
  get auth(): Record<string, string> {
    if (this.authentication.rauth) {
      if (typeof this.authentication.rauth === "string") {
        return {
          "X-Session-Token": this.authentication.rauth,
        };
      }
    } else if (this.authentication.revolt) {
      switch (typeof this.authentication.revolt) {
        case "string": {
          return {
            "X-Bot-Token": this.authentication.revolt,
          };
        }
        case "object": {
          return {
            "X-Session-Token": this.authentication.revolt.token,
          };
        }
      }
    } else if (this.authentication.headers) {
      return this.authentication.headers;
    }

    return {};
  }

  /**
   * Generate config to pass through to API.
   */
  get config(): RequestOptions {
    return {
      baseURL: this.baseURL,
      headers: {
        ...this.auth,
        ...this.headers,
      },
    };
  }

  /**
   * Send any arbitrary request.
   * @param method HTTP Method
   * @param path Path
   * @param params Body or Query Parameters
   * @param config Request configuration
   * @returns Typed Response Data
   */
  async req<
    Method extends Methods,
    Routes extends PickRoutes<Method>,
    Path extends Routes["path"],
    Route extends Routes & { path: Path; parts: Count<Path, "/"> }
  >(
    method: Method,
    path: Path,
    params: Route["params"],
    config?: RequestOptions
  ): Promise<Route["response"]> {
    let query = new URLSearchParams();
    let body = {} as Record<any, any>;
    let named = getPathName(path);

    // If we are aware of this route, then match the parameters given.
    if (named && typeof params === "object") {
      const route = queryParams[named as keyof typeof queryParams];
      const allowed_query = (route as unknown as Record<Method, string[]>)[
        method
      ];
      // Map each parameter to the correct object.
      for (const parameter of Object.keys(params)) {
        // omit undefined values
        if (typeof (params as Record<any, any>)[parameter] !== "undefined") {
          if (allowed_query?.includes(parameter)) {
            query.append(parameter, (params as Record<any, any>)[parameter]);
          } else {
            body[parameter] = (params as Record<any, any>)[parameter];
          }
        }
      }
    }
    const passbody = ["head", "get"].includes(method)
      ? undefined
      : JSON.stringify(body);

    let fetchpath = `${path}?${query.toString()}`;
    if (fetchpath.startsWith("/")) {
      fetchpath = (config?.baseURL || this.baseURL) + fetchpath;
    }

    const fetchdata = await fetch(new URL(fetchpath).toString(), {
      method,
      headers: {
        ...(config?.headers || {}),
        ...(this.config.headers || {}),
      } as HeadersInit,
      body: passbody,
    });
    return await fetchdata[config?.responseType || "json"]();
  }

  /**
   * Send HTTP GET request.
   * @param path Path
   * @param params Body or Query Parameters
   * @param config Axios configuration
   * @returns Typed Response Data
   */
  get<
    Path extends GetRoutes["path"],
    Route extends GetRoutes & { path: Path; parts: Count<Path, "/"> }
  >(
    path: Path,
    params: Route["params"],
    config?: RequestOptions
  ): Promise<Route["response"]>;

  /**
   * Send HTTP GET request.
   * @param path Path
   * @returns Typed Response Data
   */
  get<
    Path extends (GetRoutes & { params: undefined })["path"],
    Route extends GetRoutes & { path: Path; parts: Count<Path, "/"> }
  >(path: Path): Promise<Route["response"]>;

  get(path: any, params?: any, config?: RequestOptions): Promise<any> {
    // @ts-ignore-next-line
    return this.req("get", path, params, config);
  }

  /**
   * Send HTTP PATCH request.
   * @param path Path
   * @param params Body or Query Parameters
   * @param config Axios configuration
   * @returns Typed Response Data
   */
  patch<
    Path extends PatchRoutes["path"],
    Route extends PatchRoutes & { path: Path; parts: Count<Path, "/"> }
  >(
    path: Path,
    params: Route["params"],
    config?: RequestOptions
  ): Promise<Route["response"]>;

  /**
   * Send HTTP PATCH request.
   * @param path Path
   * @returns Typed Response Data
   */
  patch<
    Path extends (PatchRoutes & { params: undefined })["path"],
    Route extends PatchRoutes & { path: Path; parts: Count<Path, "/"> }
  >(path: Path): Promise<Route["response"]>;

  patch(path: any, params?: any, config?: RequestOptions): Promise<any> {
    // @ts-ignore-next-line
    return this.req("patch", path, params, config);
  }

  /**
   * Send HTTP PUT request.
   * @param path Path
   * @param params Body or Query Parameters
   * @param config Axios configuration
   * @returns Typed Response Data
   */
  put<
    Path extends PutRoutes["path"],
    Route extends PutRoutes & { path: Path; parts: Count<Path, "/"> }
  >(
    path: Path,
    params: Route["params"],
    config?: RequestOptions
  ): Promise<Route["response"]>;

  /**
   * Send HTTP PUT request.
   * @param path Path
   * @returns Typed Response Data
   */
  put<
    Path extends (PutRoutes & { params: undefined })["path"],
    Route extends PutRoutes & { path: Path; parts: Count<Path, "/"> }
  >(path: Path): Promise<Route["response"]>;

  put(path: any, params?: any, config?: RequestOptions): Promise<any> {
    // @ts-ignore-next-line
    return this.req("put", path, params, config);
  }

  /**
   * Send HTTP DELETE request.
   * @param path Path
   * @param params Body or Query Parameters
   * @param config Axios configuration
   * @returns Typed Response Data
   */
  delete<
    Path extends DeleteRoutes["path"],
    Route extends DeleteRoutes & { path: Path; parts: Count<Path, "/"> }
  >(
    path: Path,
    params?: any,
    config?: RequestOptions
  ): Promise<Route["response"]>;

  /**
   * Send HTTP DELETE request.
   * @param path Path
   * @param params Body or Query Parameters
   * @returns Typed Response Data
   */
  delete<
    Path extends (DeleteRoutes & { params: undefined })["path"],
    Route extends DeleteRoutes & { path: Path; parts: Count<Path, "/"> }
  >(path: Path, params?: any): Promise<Route["response"]>;

  delete(path: any, params?: any, config?: RequestOptions): Promise<any> {
    // @ts-ignore-next-line
    return this.req("delete", path, params, config);
  }

  /**
   * Send HTTP POST request.
   * @param path Path
   * @param params Body or Query Parameters
   * @param config Axios configuration
   * @returns Typed Response Data
   */
  post<
    Path extends PostRoutes["path"],
    Route extends PostRoutes & { path: Path; parts: Count<Path, "/"> }
  >(
    path: Path,
    params: Route["params"],
    config?: RequestOptions
  ): Promise<Route["response"]>;

  /**
   * Send HTTP POST request.
   * @param path Path
   * @returns Typed Response Data
   */
  post<
    Path extends (PostRoutes & { params: undefined })["path"],
    Route extends PostRoutes & { path: Path; parts: Count<Path, "/"> }
  >(path: Path): Promise<Route["response"]>;

  post(path: any, params?: any, config?: RequestOptions): Promise<any> {
    // @ts-ignore-next-line
    return this.req("post", path, params, config);
  }
}
