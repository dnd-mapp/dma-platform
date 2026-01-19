import { Controller, Get } from '@nestjs/common';

@Controller('/health')
export class HealthController {
    /**
     * Checks whether the app is running.
     */
    @Get('/live')
    public livenessCheck() {
        return { status: 'OK' };
    }

    /**
     * Checks whether the app is ready to receive network traffic.
     */
    @Get('/ready')
    public readinessCheck() {
        return { status: 'OK' };
    }
}
