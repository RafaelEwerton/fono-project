import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Baby,
  Mic2,
  Ear,
  Brain,
  Star,
  ChevronDown,
  Clock,
} from "lucide-react";

import retratoAsset from "@/assets/retrato.jpg";
import consultorio from "@/assets/consultorio.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const WHATSAPP =
  "https://wa.me/5583991073398?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20fonoaudiol%C3%B3gica.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fga. Bianca Cavalcante | Fonoaudióloga em João Pessoa" },
      {
        name: "description",
        content:
          "Clínica de fonoaudiologia com atendimento humanizado para crianças, adultos e idosos: linguagem, fala, voz, audição e deglutição. Agende pelo WhatsApp.",
      },
      { property: "og:title", content: "Fga. Bianca Cavalcante | Fonoaudióloga" },
      {
        property: "og:description",
        content:
          "Avaliação e terapia fonoaudiológica com acolhimento: linguagem infantil, voz, audição e deglutição.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const servicos = [
  {
    icon: Baby,
    titulo: "Linguagem infantil",
    texto: "Atraso de fala, trocas nos sons e estimulação da comunicação desde os primeiros anos.",
  },
  {
    icon: Mic2,
    titulo: "Atendimento para jovens e adultos",
    texto: "Atendimento individualizado para diferentes necessidades de comunicação, linguagem, fala, leitura, escrita e cognição.",
  },
  {
    icon: Ear,
    titulo: "Seletividade Alimentar",
    texto: "A atuação fonoaudiológica na seletividade alimentar é voltada principalmente para compreender e tratar as dificuldades relacionadas às habilidades orais, sensoriais, motoras e comunicativas envolvidas na alimentação. ",
  },
  {
    icon: Brain,
    titulo: "Neurofuncional",
    texto: "Reabilitação da fala e da linguagem após AVC, TCE e em quadros neurológicos.",
  },
];

const faqs = [
  {
    q: "A partir de que idade a criança pode ser atendida?",
    a: "Desde os primeiros meses de vida. Quanto mais cedo a avaliação, mais natural e leve é o processo de estimulação.",
  },
  {
    q: "Como funciona a primeira consulta?",
    a: "É uma avaliação de cerca de 60 minutos, com conversa sobre o histórico, testes específicos e devolutiva com um plano terapêutico claro.",
  },
  {
    q: "Vocês atendem por convênio?",
    a: "O atendimento é particular, com emissão de recibo e relatório para reembolso junto ao seu plano de saúde.",
  },
  {
    q: "Existe atendimento online?",
    a: "Sim. A teleconsulta é indicada para diversos casos de voz, linguagem e orientação familiar, seguindo as normas do conselho.",
  },
  {
    q: "Qual a frequência das sessões?",
    a: "Normalmente uma a duas sessões semanais de 45 minutos, definidas conforme a avaliação inicial e a evolução de cada pessoa.",
  },
];

const depoimentos = [
  {
    nome: "M.G.   ",
    texto:
      "Segui suas orientações e meu filho agora é um tagarela.",
  },
  {
    nome: "I.S.",
    texto:
      "Quero deixar registrada toda a minha gratidão à Bianca. Ela acompanhou minha filha durante três anos e, nesse tempo, demonstrou ser uma profissional excepcional. Sempre foi muito dedicada, comprometida, atenciosa e, acima de tudo, tratou minha filha com muito carinho e respeito. Sua competência e amor pelo que faz fizeram toda a diferença em nossa caminhada. Só tenho a agradecer por todo o cuidado e dedicação. É uma profissional que indico de olhos fechados. Que Deus continue abençoando sua vida e sua trajetória!",
  },
  {
    nome: "Helena M.",
    texto: "Profissional atenta e humanizada!",
  },
];

const posts = [
  {
    img: blog1,
    tag: "Infantil",
    titulo: "Quando o atraso de fala merece atenção?",
    resumo: "Sinais que ajudam pais e cuidadores a perceber o momento certo de buscar avaliação.",
    data: "12 de julho, 2026",
  },
  {
    img: blog2,
    tag: "Voz",
    titulo: "Cinco hábitos que preservam a sua voz",
    resumo: "Pequenos cuidados diários que evitam fadiga vocal em quem fala muito no trabalho.",
    data: "28 de junho, 2026",
  },
  {
    img: blog3,
    tag: "Audição",
    titulo: "Ouvir bem também é cuidar da memória",
    resumo: "A relação entre perda auditiva não tratada e o isolamento social na terceira idade.",
    data: "05 de junho, 2026",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <Faq />
        <Depoimentos />
        <Blog />
        <Contato />
      </main>
      <Footer />
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#blog", label: "Blog" },
  { href: "#contato", label: "Contato" },
];

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:flex sm:justify-between">
        <a href="#topo" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl gradient-soft text-sm font-bold text-secondary-foreground">
            BA
          </span>
          <span className="truncate font-display text-base font-semibold">Fga. Bianca Cavalcante</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Agendar
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-soft opacity-60" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            FONOAUDIÓLOGIA INFANTOJUVENIL · CRFA 413588
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
            Cuidar da comunicação é cuidar de vínculos
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Avaliação e terapia fonoaudiológica para crianças, adultos e idosos, em um espaço
            tranquilo e acolhedor em João Pessoa-PB ou no conforto da sua casa, por meio do
            atendimento domiciliar.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" /> Agendar pelo WhatsApp
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center rounded-full border border-primary/30 bg-card px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary"
            >
              Ver especialidades
            </a>
          </div>
          <dl className="mt-9 flex flex-wrap gap-8">
            {[
              ["7 anos", "de experiência clínica"],
              ["+200", "atendimentos realizados"],
              ["Online", "e Presencial"],
            ].map(([n, l]) => (
              <div key={n}>
                <dt className="font-display text-2xl font-bold text-primary">{n}</dt>
                <dd className="text-xs text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <img
            src={retratoAsset}
            width={1024}
            height={1280}
            alt="Fga. Bianca Cavalcante, fonoaudióloga, sorrindo em seu consultório"
            className="w-full rounded-[2rem] object-cover shadow-xl"
          />
          <div className="surface-soft absolute -bottom-5 left-4 flex items-center gap-3 px-4 py-3 sm:left-8">
            <Clock className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-xs font-semibold leading-tight">
              Retorno de contato
              <span className="block font-normal text-muted-foreground">em até 24 horas úteis</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground/70">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {text ? <p className="mt-3 text-muted-foreground">{text}</p> : null}
    </div>
  );
}

function Sobre() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <img
          src={consultorio}
          width={1200}
          height={800}
          loading="lazy"
          alt="Consultório de fonoaudiologia com mesa de madeira, espelho e brinquedos"
          className="w-full rounded-[2rem] object-cover shadow-lg"
        />
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground/70">
            Sobre a profissional
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Escuta atenta, plano claro</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Sou Bianca Cavalcante, fonoaudióloga formada pela Universidade Federal da Paraíba, 
            especialista em Linguagem Infantil e com formação complementar em PROMPT, PECS, ABA, Denver e Bandagem Elástica. 
            Ao longo da minha trajetória, venho acompanhando crianças, 
            adultos e famílias em diferentes desafios relacionados à comunicação, à linguagem e à alimentação.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Meu trabalho começa com uma avaliação cuidadosa e com a definição de 
            objetivos junto a cada pessoa que chega até aqui. Cada sessão é planejada 
            para ser leve e acolhedora, buscando resultados que 
            façam diferença na vida real: na escola, no trabalho e à mesa, junto à família.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {[
              //"Especialista em Linguagem Infantil ",
              //"Aprimoramentos em Avaliação e Intervenção em linguagem;",
              //"Formação PROMPT",
            ].map((i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Servicos() {
  return (
    <section id="servicos" className="bg-muted/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Serviços"
          title="Cuidado para cada fase da vida"
          text="Atendimentos presenciais em João Pessoa -PB  e sessões online para todo o Brasil."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((s) => (
            <article key={s.titulo} className="surface-soft p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [aberta, setAberta] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <SectionTitle eyebrow="Perguntas frequentes" title="Dúvidas antes de começar" />
      <div className="mt-10 space-y-3">
        {faqs.map((f, i) => {
          const open = aberta === i;
          return (
            <div key={f.q} className="surface-soft overflow-hidden">
              <button
                onClick={() => setAberta(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display text-base font-semibold">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
              {open ? (
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Depoimentos() {
  return (
    <section className="gradient-soft py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Depoimentos" title="Histórias de quem voltou a se comunicar" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.nome} className="surface-soft flex h-full flex-col p-6">
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                “{d.texto}”
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold">{d.nome}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <SectionTitle
        eyebrow="Blog"
        title="Conteúdos para o dia a dia"
        text="Textos curtos sobre fala, voz, audição e desenvolvimento infantil."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.titulo} className="surface-soft overflow-hidden">
            <img
              src={p.img}
              width={900}
              height={600}
              loading="lazy"
              alt={p.titulo}
              className="h-44 w-full object-cover"
            />
            <div className="p-5">
              <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-secondary-foreground">
                {p.tag}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-snug">{p.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.resumo}</p>
              <p className="mt-4 text-xs text-muted-foreground">{p.data}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contato() {
  const [enviado, setEnviado] = useState(false);
  return (
    <section id="contato" className="bg-muted/50 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground/70">
            Contato
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Vamos conversar</h2>
          <p className="mt-3 text-muted-foreground">
            Conte um pouco sobre o que você procura. O retorno acontece em até 24 horas úteis.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-primary" /> (83) 99107-3398
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-primary" /> biancaaraujo198@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-5 w-5 shrink-0 text-primary" /> Seg a sex, das 9h às 18h
            </li>
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEnviado(true);
          }}
          className="surface-soft space-y-4 p-6"
        >
          {[
            { id: "nome", label: "Nome", type: "text", ph: "Como podemos te chamar?" },
            { id: "email", label: "E-mail", type: "email", ph: "seu@email.com" },
            { id: "telefone", label: "Telefone / WhatsApp", type: "tel", ph: "(11) 90000-0000" },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="text-sm font-semibold">
                {f.label}
              </label>
              <input
                id={f.id}
                type={f.type}
                required
                placeholder={f.ph}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
            </div>
          ))}
          <div>
            <label htmlFor="mensagem" className="text-sm font-semibold">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              rows={4}
              required
              placeholder="Conte brevemente sua necessidade"
              className="mt-1.5 w-full resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Enviar mensagem
          </button>
          {enviado ? (
            <p className="text-center text-sm font-medium text-primary" role="status">
              Obrigada! Sua mensagem foi registrada e responderemos em breve.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-display text-lg font-semibold">Fga. Bianca Cavalcante</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Fonoaudióloga · CRFA 413588 · João Pessoa/PB
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
        <div className="flex gap-3">
          {[
            { icon: Instagram, label: "Instagram", href: "https://instagram.com/Biancacavalcant_" },
            //{ icon: Facebook, label: "Facebook", href: "https://facebook.com" },
            { icon: MessageCircle, label: "WhatsApp", href: WHATSAPP },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-accent"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
