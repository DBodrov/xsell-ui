class EnvironmentBuilder {
  HOST_API: string;

  PORT_API: string;

  readonly isProductionBuild = process.env.NODE_ENV === 'production' && process.env.ENV === 'production';

  readonly isLocalBuild = process.env.NODE_ENV === 'production' && process.env.ENV === 'local';

  readonly isDevMode = process.env.NODE_ENV === 'development';

  readonly isJestEnv = process.env.NODE_ENV === 'test';

  // private isTestBuild = process.env.NODE_ENV === 'production' && process.env.ENV === 'test';

  private isStagingBuild = process.env.NODE_ENV === 'production' && process.env.ENV === 'staging';

  private SERVER_HOST_DEV = 'http://localhost';

  private SERVER_LOCAL_HOST = 'http://localhost';

  private SERVER_HOST_PROD = `//${window.location.hostname}`;

  private SERVER_PORT_DEV = '8080';

  private SERVER_PORT_PROD = window.location.port;

  ApiURL(): string {
    if (this.isProductionBuild || this.isStagingBuild || this.isDevMode) {
      this.HOST_API = this.SERVER_HOST_PROD;
      this.PORT_API = this.SERVER_PORT_PROD;
    } else if (this.isLocalBuild) {
      this.HOST_API = this.SERVER_LOCAL_HOST;
      this.PORT_API = this.SERVER_PORT_DEV;
    }

    return `${this.HOST_API}:${this.PORT_API}/api`;
  }

  isProdMode = () => this.isProductionBuild;

  isStagingMode = () => this.isStagingBuild;

  isTestMode = () => this.isLocalBuild || this.isDevMode;

  //getSessionStage = () => process.env.SESSION_STAGE;
}

const env = new EnvironmentBuilder();
export const API_URL = env.ApiURL();
// export const SESSION_STAGE = (env.getSessionStage() as TSessionStatus) || null;
export const TestMode = env.isTestMode();
export const ProdMode = env.isProdMode();
export const StagingMode = env.isStagingMode();
export const JestEnv = env.isJestEnv;

// export const getEnv = () => {
//   if (TestMode) {
//     return 'TestMode';
//   }
//   if (ProdMode) {
//     return 'Production';
//   }
//   if (StagingMode) {
//     return 'Staging';
//   }
//   if (JestEnv) {
//     return 'JestEnv';
//   }
//   return 'Unknown';
// };
