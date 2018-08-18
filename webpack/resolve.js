import path from "path";
import config from './config';

export default {
    alias: {
        '@Containers': path.join( config.paths.src, 'Containers' ),
        '@Components': path.join( config.paths.src, 'Components' ),
        '@Utilities': path.join( config.paths.src, 'Utilities' ),
        '@Images': path.join( config.paths.src, 'Images' ),
        '@Fonts': path.join( config.paths.src, 'Fonts' )
    }
};