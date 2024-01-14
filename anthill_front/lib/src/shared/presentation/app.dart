import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../modules/auth/auth_module.dart';
import 'router.dart';

class AnthillApp extends StatelessWidget {
  const AnthillApp({super.key});

  @override
  Widget build(BuildContext context) {
    final router = buildRouter(context);

    return ProviderScope(
      child: Loader(
        loginPage: const MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Login | Anthill',
          home: LoginPage(),
        ),
        child: MaterialApp.router(
          routerConfig: router,
          debugShowCheckedModeBanner: false,
          title: 'Anthill',
        ),
      ),
    );
  }
}
