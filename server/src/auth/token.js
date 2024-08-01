/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written byAPS Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

"use strict";

class Token {
  constructor(session) {
    this._session = session;
  }

  /**
   * TheAPS oAuth2 client JSON template
   */
  getOAuthTemplate() {
    return {
      authentication: {
        authorizationUrl: "/authentication/v2/authorize",
        tokenUrl: "/authentication/v2/token",
        refreshTokenUrl: "/authentication/v2/token",
        scopes: {
          "data:read":
            "The application will be able to read the end user’s data within the Autodesk ecosystem.",
          "data:write":
            "The application will be able to create, update, and delete data on behalf of the end user within the Autodesk ecosystem.",
          "data:create":
            "The application will be able to create data on behalf of the end user within the Autodesk ecosystem.",
          "data:search":
            "The application will be able to search the end user’s data within the Autodesk ecosystem.",
          "bucket:create":
            "The application will be able to create an OSS bucket it will own.",
          "bucket:read":
            "The application will be able to read the metadata and list contents for OSS buckets that it has access to.",
          "bucket:update":
            "The application will be able to set permissions and entitlements for OSS buckets that it has permission to modify.",
          "bucket:delete":
            "The application will be able to delete a bucket that it has permission to delete.",
          "code:all":
            "The application will be able to author and execute code on behalf of the end user (e.g., scripts processed by the Design Automation API).",
          "account:read":
            "For Product APIs, the application will be able to read the account data the end user has entitlements to.",
          "account:write":
            "For Product APIs, the application will be able to update the account data the end user has entitlements to.",
          "user-profile:read":
            "The application will be able to read the end user’s profile data.",
          "viewables:read":
            "The application will have read access to viewable resources such as thumbnails. This scope is a subset of data:read.",
        },
      },
      authName: "oauth2_access_code",
      clientId: "",
      clientSecret: "",
      credentials: {
        expires_at: 0,
      },
      autoRefresh: false,
      basePath: "https://developer.api.autodesk.com",
      scope:
        "data:read data:write data:create data:search bucket:create bucket:read bucket:update bucket:delete",
      redirectUri: "",
    };
  }

  getForgeSession() {
    // reconstruct JSON structure per template
    let apsSession = {
      session: {
        passport: {
          user: this._session.passport.user,
        },
        oauth2: {
          aps: this.getOAuthTemplate(),
        },
      },
    };
    apsSession.session.oauth2.aps.clientId = this._session.aps.oauth2.client_id;
    apsSession.session.oauth2.aps.clientSecret =
      this._session.aps.oauth2.client_secret;
    apsSession.session.oauth2.aps.credentials.expires_at =
      this._session.aps.oauth2.expires_at;
    apsSession.session.oauth2.aps.autoRefresh =
      this._session.aps.oauth2.auto_refresh;
    apsSession.session.oauth2.aps.scope = this._session.aps.oauth2.scope;
    apsSession.session.oauth2.aps.redirectUri =
      this._session.aps.oauth2.redirect_uri;
    return apsSession;
  }

  /**
   * TheAPS session has following JSON structure
   *
   * {
   *   session: {
   *     oauth2: {
   *       auto_refresh: <Boolean>,
   *       client_id: <String>,
   *       client_secret: <String>,
   *       expires_at: <String>,
   *       redirect_uri: <String>,
   *       scope: <Array>
   *     }
   *   }
   * }
   */
  setForgeSession(apsSession) {
    this._session.aps = apsSession;
  }

  get isAuthorized() {
    // !! converts value into boolean
    return !!this._session.passport.user;
  }
}
module.exports = Token; // eslint-enable no-use-before-define
