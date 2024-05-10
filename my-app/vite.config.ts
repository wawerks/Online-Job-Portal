import { defineConfig, resolveConfig } from 'vite';
import { resolve } from 'path';
export default defineConfig({
  
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions:{
      input :{
        login: resolve(__dirname, 'src/index.html'),
        reg: resolve(__dirname, 'src/reg.html'),
        home: resolve(__dirname, 'src/home.html'),
        Agriculture: resolve(__dirname, 'src/Agriculture.html'),
        Accounting: resolve(__dirname, 'src/Accounting.html'),
        ComputerRelated: resolve(__dirname, 'src/ComputerRelated.html'),
        Education: resolve(__dirname, 'src/Education.html'),
        Engineering: resolve(__dirname, 'src/Engineering.html'),
        Freelancing: resolve (__dirname,'src/Freelancing.html'),
        Application: resolve(__dirname, 'src/Application.html'),
        profile: resolve(__dirname, 'src/profile.html'),
        about: resolve(__dirname, 'src/about.html'),
        terms: resolve(__dirname, 'src/terms.html'),
        Post: resolve(__dirname, 'src/Post.html'),
        notif: resolve(__dirname, 'src/notif.html'),


      },
    }
  },
});
